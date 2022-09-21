const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const request = require('request');

const { createConnection } = require('mysql');		//SQL requirement
const config = require('../config.json');			//SQL requirement

module.exports = {
	data: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Returns ark server information')
		.addSubcommand(subcommand =>
			subcommand
				.setName('rates')
				.setDescription('Returns General server information (such as taming rates, harvest etc)')),
				
	async execute(interaction) {
		const member = interaction.member;
		console.log(member.username + " ran the command " + interaction.options.getSubcommand());
		if (interaction.options.getSubcommand() === 'rates') {
		//-----------------
		
		const o_lloc = {
			url: "http://beerbot.jonathonmorris.co.uk/arkdynamic/bobsrus.php"
		};

		async function c_lloc(e_lloc, r_lloc, b_lloc) {
			if (!e_lloc && r_lloc.statusCode == 200) {
				return interaction.reply({ content: "**Server Settings**\n"+b_lloc, ephemeral: true });
			}
		};
		request(o_lloc, c_lloc);
		//-----------------
		} else if (interaction.options.getSubcommand() === 'find') {
			//console.log(interaction.options);
			//console.log("-----");
			//console.log(command.Data.Options.First().Value.ToString());
			return interaction.reply({ content: "Coming Soon", ephemeral: true });
		} else {
			return interaction.reply({ content: `You should select one of the options.`, ephemeral: true });
		}
	},
};