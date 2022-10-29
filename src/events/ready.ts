import { Event } from "../structures/Event";
import { client } from "..";
import { ActivityType } from "discord.js";

export default new Event("ready", () => {
  client.logger.info(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    status: "idle",
    activities: [
      {
        name: "SweetsNodes System",
        type: ActivityType.Watching
      }
    ]
  });
});