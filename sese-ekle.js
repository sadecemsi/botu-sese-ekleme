const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sese-ekle')
    .setDescription('Botu ses kanalına ekler'),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply('Önce bir ses kanalına katılmalısın!');
    }

    try {
      joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
      await interaction.reply(`Başarıyla ${voiceChannel.name} kanalına katıldım!`);
    } catch (error) {
      console.error(error);
      await interaction.reply('Ses kanalına katılırken bir hata oluştu.');
    }
  },
};