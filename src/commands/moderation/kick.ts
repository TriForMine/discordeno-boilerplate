import { DiscordenoMember } from "../../../deps.ts";
import { Embed } from "../../utils/Embed.ts";
import { createCommand, sendEmbed } from "../../utils/helpers.ts";

createCommand({
  name: `kick`,
  guildOnly: true,
  arguments: [
    {
      name: "member",
      type: "member",
      missing: (message) => {
        return message.reply("User not found!");
      },
    },
    {
      name: "reason",
      type: "...string",
      defaultValue: "No reason given",
    },
  ],
  userServerPermissions: [
    "KICK_MEMBERS",
  ],
  botServerPermissions: [
    "KICK_MEMBERS",
  ],
  execute: async (message, args: KickArgs) => {
    try {
      await args.member.kick(message.guildId, args.reason);

      const embed = new Embed()
        .setColor("#FFA500")
        .setTitle(`Kicked User`)
        .addField("User:", args.member.mention, true)
        .addField("Kicked By:", `<@${message.authorId}>`, true)
        .addField("Reason:", args.reason)
        .setTimestamp();

      return sendEmbed(message.channelId, embed);
    } catch {
      return message.send("Attempt to kick user has failed!");
    }
  },
});

interface KickArgs {
  member: DiscordenoMember;
  reason: string;
}
