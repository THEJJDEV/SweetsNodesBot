import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js";
import { CommandType } from "../typings/Command";
import { promisify } from "util";
import { Event } from "./Event";
import { token, mongodb } from "../config";
import { Database } from "quickmongo";
import logger from "@sweetsnodes/logger";
import glob from "glob";
import { RegisterCommandsOptions } from "../typings/Client";

let globPromise = promisify(glob);

export class SweetsClient extends Client {
  public commands: Collection<string, CommandType> = new Collection();
  public logger = logger;
  public db: Database;

  public constructor() {
    super({
      intents: 131071,
    });
  }

  public connect() {
    this.connectDatabase();
    this.registerModules();
    this.login(token);
  }

  private async connectDatabase(url?: string) {
    if (!url) url = mongodb;
    this.db = new Database(url);
    this.db.on("ready", () => logger.info(`Database connected!`));
  }

  private async importFile(path: string) {
    return (await import(path))?.default;
  }

  private async registerCommands({ commands }: RegisterCommandsOptions) {
    this.application?.commands.set(commands);
    logger.info("Registering global commands");
  }

  private async registerModules() {
    let cmds: ApplicationCommandDataResolvable[] = [];
    let cmdFiles = await globPromise(`${__dirname}/../commands/*{.ts,.js}`);
    cmdFiles.map(async (path: string) => {
      let cmd: CommandType = await this.importFile(path);
      if (!cmd.name) return;
      this.commands.set(cmd.name, cmd);
      cmds.push(cmd);
    });

    let eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
    eventFiles.map(async (path: string) => {
      let e: Event<keyof ClientEvents> = await this.importFile(path);
      this.on(e.event, e.run);
    });

    this.on("ready", () =>
      this.registerCommands({
        commands: cmds,
      })
    );
  }
}
