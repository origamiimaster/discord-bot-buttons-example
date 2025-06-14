const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('See the main menu'),
	async execute(interaction) {
		const embeds = [
			{
				"type": "rich",
				"title": `Main Menu`,
				"description": `Choose an option to get started!`,
				"color": 0x00FFFF
			}
		]

		const components = [
			{
				"type": 1,
				"components": [
					{
						"style": 3,
						"label": `Start Bot`,
						"custom_id": `start_bot`,
						"disabled": false,
						"type": 2
					},
					{
						"style": 1,
						"label": `Create Bot`,
						"custom_id": `create_bot`,
						"disabled": false,
						"type": 2
					},
					{
						"style": 4,
						"label": `Stop Bot`,
						"custom_id": `stop_bot`,
						"disabled": false,
						"type": 2
					}
				]
			}
		]

		// const buttons = new MessageActionRow()
		// 	.addComponents(
		// 		new MessageButton()
		// 			.setCustomId('primary')
		// 			.setLabel('Primary')
		// 			.setStyle('PRIMARY'),
		// 		new MessageButton()
		// 			.setCustomId('secondary')
		// 			.setLabel('Secondary')
		// 			.setStyle('SECONDARY'),
		// 	)


		interaction.reply({ embeds: embeds, components: components, fetchReply: true })
			.then((message) => {
				const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });

				collector.on('collect', i => {
					if (i.user.id === interaction.user.id) {
						i.reply(`${i.user.id} clicked on the ${i.customId} button.`);
					} else {
						i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
					}
				});
			})
	},
};