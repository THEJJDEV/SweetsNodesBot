import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Command";

export default new Event("interactionCreate", async(interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.followUp("ไม่พบคำสั่งที่คุณใช้งาน");
    
    client.logger.debug(`${interaction.user.tag} (${interaction.user.id}): Execute command "${command.name}" in ${interaction.guild.name} (${interaction.guild.id})`);
    command.run({
      args: (interaction.options) as CommandInteractionOptionResolver,
      client: client,
      interaction: interaction as ExtendedInteraction
    });
  }
});
