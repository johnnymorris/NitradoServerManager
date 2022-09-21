const { SlashCommandBuilder } = require('@discordjs/builders');
const request = require('request');

function readable_drops(drop_name){
	switch (drop_name.toLowerCase()) {
		case "supplycrate_cave_qualitytier1_c":
			return "cave beacon 1";
			break;
		  case "supplycrate_cave_qualitytier2_c":
			return "cave beacon 2";
			break;
		  case "supplycrate_cave_qualitytier3_c":
			return "cave beacon 3";
			break;
		  case "supplycrate_cave_qualitytier4_c":
			return "cave beacon 4";
			break;
		  case "supplycrate_swampcavetier1_c":
			return "swamp cave loot crate blue";
			break;
		  case "supplycrate_swampcavetier2_c":
			return "swamp cave loot crate yellow";
			break;
		  case "supplycrate_swampcavetier3_c":
			return "swamp cave loot crate red";
			break;
		  case "supplycrate_icecavetier1_c":
			return "ice cave loot crate blue";
			break;
		  case "supplycrate_icecavetier2_c":
			return "ice cave loot crate yellow";
			break;
		  case "supplycrate_icecavetier3_c":
			return "ice cave loot crate red";
			break;
		  case "supplycrate_underwatercavetier1_c":
			return "underwater caves loot crate blue";
			break;
		  case "supplycrate_underwatercavetier2_c":
			return "underwater caves loot crate yellow";
			break;
		  case "supplycrate_underwatercavetier3_c":
			return "underwater caves loot crate red";
			break;
		  case "supplycrate_oceaninstant_c":
			return "deep sea loot crate";
			break;
		  case "supplycrate_oceaninstant_high_c":
			return "";
			break;
		  case "supplycrate_level03_c":
			return "white beacon";
			break;
		  case "supplycrate_level03_double_c":
			return "white beacon (double items)";
			break;
		  case "supplycrate_level15_c":
			return "green beacon";
			break;
		  case "supplycrate_level15_double_c":
			return "green beacon (double items)";
			break;
		  case "supplycrate_level25_c":
			return "blue beacon";
			break;
		  case "supplycrate_level25_double_c":
			return "blue beacon (double items)";
			break;
		  case "supplycrate_level35_c":
			return "purple beacon";
			break;
		  case "supplycrate_level35_double_c":
			return "purple beacon (double items)";
			break;
		  case "supplycrate_level45_c":
			return "yellow beacon";
			break;
		  case "supplycrate_level45_double_c":
			return "yellow beacon (double items)";
			break;
		  case "supplycrate_level60_c":
			return "red beacon";
			break;
		  case "supplycrate_level60_double_c":
			return "red beacon (double items)";
			break;
		  case "artifactcrate_1_c":
			return "artifact container hunter";
			break;
		  case "artifactcrate_2_c":
			return "artifact container pack";
			break;
		  case "artifactcrate_3_c":
			return "artifact container massive";
			break;
		  case "artifactcrate_4_c":
			return "artifact container devious";
			break;
		  case "artifactcrate_5_c":
			return "artifact container clever";
			break;
		  case "artifactcrate_6_c":
			return "artifact container skylord";
			break;
		  case "artifactcrate_7_c":
			return "artifact container devourer";
			break;
		  case "artifactcrate_8_c":
			return "artifact container immune";
			break;
		  case "artifactcrate_9_c":
			return "artifact container strong";
			break;
		  case "artifactcrate_10_c":
			return "artifact container cunning";
			break;
		  case "artifactcrate_11_c":
			return "artifact container brute";
			break;
		  case "beaverdam_c":
			return "beaver dam";
			break;
		  case "supplycratebasebp_instantaneous_damlogs_child_c":
			return "giant beaver dam logs";
			break;
		  case "supplycratebasebp_instantaneous_denlogs_child2_c":
			return "giant beaver dam";
			break;
		  case "supplycrate_cave_qualitytier1_scorchedearth_c":
			return "se cave beacon 1";
			break;
		  case "supplycrate_cave_qualitytier2_scorchedearth_c":
			return "se cave beacon 2";
			break;
		  case "supplycrate_cave_qualitytier3_scorchedearth_c":
			return "se cave beacon 3";
			break;
		  case "supplycrate_level03_scorchedearth_c":
			return "se white beacon";
			break;
		  case "supplycrate_level03_double_scorchedearth_c":
			return "se white beacon (double items)";
			break;
		  case "supplycrate_level15_scorchedearth_c":
			return "se green beacon";
			break;
		  case "supplycrate_level15_double_scorchedearth_c":
			return "se green beacon (double items)";
			break;
		  case "supplycrate_level30_scorchedearth_c":
			return "se blue beacon";
			break;
		  case "supplycrate_level30_double_scorchedearth_c":
			return "se blue beacon (double items)";
			break;
		  case "supplycrate_level45_scorchedearth_c":
			return "se purple beacon";
			break;
		  case "supplycrate_level45_double_scorchedearth_c":
			return "se purple beacon (double items)";
			break;
		  case "supplycrate_level55_scorchedearth_c":
			return "se yellow beacon";
			break;
		  case "supplycrate_level55_double_scorchedearth_c":
			return "se yellow beacon (double items)";
			break;
		  case "supplycrate_level70_scorchedearth_c":
			return "se red beacon";
			break;
		  case "supplycrate_level70_double_scorchedearth_c":
			return "se red beacon (double items)";
			break;
		  case "artifactcrate_se_c":
			return "artifact container destroyer";
			break;
		  case "artifactcrate_2_se_c":
			return "artifact container gatekeeper";
			break;
		  case "artifactcrate_3_se_c":
			return "artifact container crag";
			break;
		  case "supplycrate_chest_treasure_jacksonl_c":
			return "rag treasure chest";
			break;
		  case "supplycreate_oceaninstant_high_c":
			return "rag desert loot crate";
			break;
		  case "supplycrate_cave_aberration_level10_c":
			return "ab white crate";
			break;
		  case "supplycrate_cave_aberration_level10_double_c":
			return "ab white beacon (double items)";
			break;
		  case "supplycrate_cave_aberration_level25_c":
			return "ab green crate";
			break;
		  case "supplycrate_cave_aberration_level25_double_c":
			return "ab green crate (double items)";
			break;
		  case "supplycrate_cave_aberration_level35_c":
			return "ab blue crate";
			break;
		  case "supplycrate_cave_aberration_level35_double_c":
			return "ab blue crate (double items)";
			break;
		  case "supplycrate_cave_aberration_level50_c":
			return "ab purple crate";
			break;
		  case "supplycrate_cave_aberration_level50_double_c":
			return "ab purple crate (double items)";
			break;
		  case "supplycrate_cave_aberration_level65_c":
			return "ab yellow crate";
			break;
		  case "supplycrate_cave_aberration_level65_double_c":
			return "ab yellow crate (double items)";
			break;
		  case "supplycrate_cave_aberration_level80_c":
			return "ab red crate";
			break;
		  case "supplycrate_cave_aberration_level80_double_c":
			return "ab red crate (double items)";
			break;
		  case "supplycrate_dungeon_aberration_level35_c":
			return "blue dungeon crate";
			break;
		  case "supplycrate_dungeon_aberration_level50_c":
			return "purple dungeon crate";
			break;
		  case "supplycrate_dungeon_aberration_level65_c":
			return "yellow dungeon crate";
			break;
		  case "supplycrate_dungeon_aberration_level80_c":
			return "red dungeon crate";
			break;
		  case "supplycrate_level35_aberrant_surface_c":
			return "blue surface beacon";
			break;
		  case "supplycrate_level35_aberrant_surface_double_c":
			return "blue surface beacon (double items)";
			break;
		  case "supplycrate_level50_aberrant_surface_c":
			return "purple surface beacon";
			break;
		  case "supplycrate_level50_aberrant_surface_double_c":
			return "purple surface beacon (double items)";
			break;
		  case "supplycrate_level65_aberrant_surface_c":
			return "yellow surface beacon";
			break;
		  case "supplycrate_level65_aberrant_surface_double_c":
			return "yellow surface beacon (double items)";
			break;
		  case "supplycrate_level80_aberrant_surface_c":
			return "red surface beacon";
			break;
		  case "supplycrate_level80_aberrant_surface_double_c":
			return "red surface beacon (double items)";
			break;
		  case "artifactcrate_ab_c":
			return "artifact container depths";
			break;
		  case "artifactcrate_2_ab_c":
			return "artifact container shadows";
			break;
		  case "artifactcrate_3_ab_c":
			return "artifact container stalker";
			break;
		  case "artifactcrate_4_ab_c":
			return "artifact container lost";
			break;
		  case "supplycrate_cave_qualitytier1_ex_c":
			return "ext cave loot crate blue";
			break;
		  case "supplycrate_cave_qualitytier2_ex_c":
			return "ext cave loot crate yellow";
			break;
		  case "supplycrate_cave_qualitytier3_ex_c":
			return "ext cave loot crate red";
			break;
		  case "supplycrate_base_horde_easy_c":
			return "orbital supply drop blue";
			break;
		  case "supplycrate_base_horde_medium_c":
			return "orbital supply drop yellow";
			break;
		  case "supplycrate_base_horde_hard_c":
			return "orbital supply drop red";
			break;
		  case "supplycrate_base_horde_legendary_c":
			return "orbital supply drop purple";
			break;
		  case "elementnode_easy_horde_c":
			return "easy corrupt element node";
			break;
		  case "elementnode_hard_horde_c":
			return "hard corrupt element node";
			break;
		  case "elementnode_medium_horde_c":
			return "medium corrupt element node";
			break;
		  case "kingkaiju_elementnode_c":
			return "king titan corrupt element node";
			break;
		  case "artifactcrate_desert_kaiju_ex_c":
			return "artifact container chaos";
			break;
		  case "artifactcrate_forestkaiju_ex_c":
			return "artifact container growth";
			break;
		  case "artifactcrate_icekaiju_ex_c":
			return "artifact container void";
			break;
		  case "artifactcrate_kingkaiju_alpha_ex_c":
			return "king titan alpha";
			break;
		  case "artifactcrate_kingkaiju_beta_ex_c":
			return "king titan beta";
			break;
		  case "artifactcrate_kingkaiju_ex_c":
			return "king titan gamma";
			break;
		  case "val_supplycrate_level35_c":
			return "valg purple beacon";
			break;
		  case "val_supplycrate_level35_double_c":
			return "valg purple beacon (double items)";
			break;
		  case "val_supplycrate_level45_c":
			return "valg yellow beacon";
			break;
		  case "val_supplycrate_level45_double_c":
			return "valg yellow beacon (double items)";
			break;
		  case "val_supplycrate_level60_c":
			return "valg red beacon";
			break;
		  case "val_supplycrate_level60_double_c":
			return "valg red beacon (double items)";
			break;
		  case "supplycrate_space_01_ambergris_c":
			return "gen2 white supply crate";
			break;
		  case "supplycrate_space_02_crystal_c":
			return "gen2 green supply crate";
			break;
		  case "supplycrate_space_03_sulfur_c":
			return "gen2 blue supply crate";
			break;
		  case "supplycrate_space_04_elementshards_c":
			return "gen2 purple supply crate";
			break;
		  case "supplycrate_space_05_obsidian_c":
			return "gen2 yellow supply crate";
			break;
		  case "supplycrate_space_06_oil_c":
			return "gen2 red supply crate";
			break;
		  case "supplycrate_space_07_elementdust_c":
			return "gen2 cyan supply crate";
			break;
		  case "supplycrate_space_08_blackpearls_c":
			return "gen2 orange supply crate";
			break;
		  case "supplycrate_level45_lostisland_c":
			return "li yellow beacon";
			break;
		  case "supplycrate_level45_lostisland_double_c":
			return "li yellow beacon (double items)";
			break;
		  case "supplycrate_level60_lostisland_c":
			return "li red beacon";
			break;
		  case "supplycrate_level60_lostisland_double_c":
			return "li red beacon (double items)";
			break;
			case "supplycrate_ruins_lostisland_c":
			  return "li ruins dungeon crate";
			  break;
			case "lootcrate_lvl1_c":
				return "li ruins dungeon crate";
				break;
			case "lootcrate_lvl2_c":
				return "li ruins dungeon crate";
				break;
			case "lootcrate_lvl3_c":
				return "li ruins dungeon crate";
				break;
		default: 
			return drop_name;
		break;
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('find')
		.setDescription('Find item from loot drops')		
		.addStringOption(option =>
			option.setName('item')
				.setDescription('The item to search for ie: rex')
				.setRequired(true)),
	async execute(interaction) {
		var item = interaction.options.getString('item').toLowerCase();

		if(item.includes("password")){
			return interaction.reply({ content: "Sorry, this items is above your rank.", ephemeral: true });
		} else {

		//return interaction.reply({ content: `Looking for item: \`${amount}\`.`, ephemeral: true });
		//return interaction.reply({ content: `So you want to find the item \`${item}\`, I am working on this feature`, ephemeral: true });
		//Start of finding drop
		const o_drop = {
			url: "http://beerbot.jonathonmorris.co.uk/arkdynamic/drops.php"
		};

		async function c_drop(e_drop, r_drop, b_drop) {
			if (!e_drop && r_drop.statusCode == 200) {
				var drop_locations = "";
				var drops=b_drop.toLowerCase();
				const full_logs=drops.split('\n');	//This will split the log file into new lines
				for(x=0;x<full_logs.length;x++){
					var line=full_logs[x];
					if(line.includes(item)){
						let linkCodeStart=line.search('supplycrateclassstring="');
						let linkCodeEnd=line.indexOf('"',linkCodeStart+25);
						let newDrop=readable_drops(line.substring(linkCodeStart+24,linkCodeEnd));

						drop_locations=drop_locations+newDrop+"\n";
					}
				}
				return interaction.reply({ content: "You can find **"+item+"**\n"+drop_locations, ephemeral: true });
			}
		};
		request(o_drop, c_drop);
		//End of finding drop
		}
	},
};