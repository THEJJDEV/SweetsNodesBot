import { Command } from "../structures/Command";
import { EmbedBuilder } from "discord.js";

export default new Command({
  name: "ping",
  description: "Ping pong!",
  category: "Information",
  run: async ({ client, interaction }) => {
    let embed: EmbedBuilder = new EmbedBuilder()
      .setColor("#00FFFF")
      .addFields([{
        name: ":ping_pong: Ping",
        value: `» ${Date.now() - interaction.createdTimestamp}ms`,
        inline: true
      }, {
        name: "🍨 WebSocket",
        value: `» ${client.ws.ping}ms`,
        inline: true
      }]);
    
    return await interaction.reply({ embeds: [ embed ] });
  }
});
