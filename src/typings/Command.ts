import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  PermissionResolvable
} from "discord.js";
import { SweetsClient } from "../structures/SweetsClient";

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
  options: CommandInteractionOptionResolver;
}

interface RunOptions {
  client: SweetsClient;
  interaction: ExtendedInteraction;
  args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
  category: string;
  userPermissions?: PermissionResolvable[];
  run: RunFunction;
} & ChatInputApplicationCommandData;
