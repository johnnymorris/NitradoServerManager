const fs = require('node:fs');
const { Client, MessageEmbed, Collection, Intents, Discord } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const { createConnection } = require('mysql');		//SQL requirement
const config = require('./config.json');			//SQL requirement
const request = require('request');					//Nitrado requirement

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const update_commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
	update_commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: update_commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

client.once('ready', () => {
	console.log('Ready!');
	status_check();
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
async function give_me_game_user_settings(service_id,username,access_token){
	return new Promise(resolve => {
	//Start Get File
		const o_lloc = {
			url: "https://api.nitrado.net/services/"+service_id+"/gameservers/file_server/download?file=%2Fgames%2F"+username+"%2Fnoftp%2Farkps%2FShooterGame%2FSaved%2FConfig%2FWindowsServer%2FGameUserSettings.ini&offset=0&length=4048",
			headers: {
				'Authorization': access_token
			}
		};

		async function c_lloc(e_lloc, r_lloc, b_lloc) {
			if (!e_lloc && r_lloc.statusCode == 200) {
				const nitrapi_lloc = JSON.parse(b_lloc);
				//Start Pull
				const o_log = {
					url: nitrapi_lloc['data']['token']['url'],
					headers: {
						'Authorization': access_token
					}
				};
				
				async function c_log(e_log, r_log, b_log) {
					if (!e_log && r_log.statusCode == 200) {
						const myresponsedata = [];
						const full_logs=b_log.split('\n');	//This will split the log file into new lines
						for(x=0;x<full_logs.length;x++){
							row=full_logs[x];
							if(row.split('=').length==2){
								var key=row.split('=')[0];
								var val=row.split('=')[1];
								myresponsedata[key]=val;
								
							}
							
						}
						resolve(myresponsedata);
					};
				}
				request(o_log, c_log);
			}
		};
		request(o_lloc, c_lloc);
	//End Get File
	});
}
async function convert_ark_map(full_map_name){
return new Promise (resolve => {
		var display_map_name=full_map_name.replace("preinstalled", "").replace(",1,", "").replace(",2,", "").replace(",3,", "").replace(",4,", "").replace(",5,", "").replace(",6,", "").replace(",7,", "").replace(",8,", "").replace(",9,", "").replace(",10,", "").replace(",11,", "").replace(",12,", "").replace(",13,", "").replace(",14,", "").replace(",15,", "");
	resolve(display_map_name);
});
}

async function give_me_gameserver_info(user_id,server_id,access_token){
	return new Promise(resolve => {
	//Start function
	const o_gameservers = {
		url: 'https://api.nitrado.net/services/'+server_id+'/gameservers',
		headers: {
			'Authorization': access_token
		}
	};
	
	async function c_gameservers(e_gameservers, r_gameservers, b_gameservers) {
		if(r_gameservers.statusCode==401){
			//access token expired. need to generate a refresh token
			const o_refreshtoken = {
				url: 'https://beerbot.jonathonmorris.co.uk/ns/arkrefreshtoken.php?u='+user_id,
				headers: {
					'Authorization': access_token
				}
			};
			
			function c_refreshtoken(e_refreshtoken, r_refreshtoken, b_refreshtoken) {
				if (!e_refreshtoken && r_refreshtoken.statusCode == 200) {
					const rtokenlog = b_refreshtoken;
				}
			};
			request(o_refreshtoken,c_refreshtoken)
		}
		
		if (!e_gameservers && r_gameservers.statusCode == 200) {
			const nitrapi_services = JSON.parse(b_gameservers);
			responsedata=nitrapi_services['data']['gameserver'];
			resolve(nitrapi_services['data']['gameserver']);
		}
	}
	request(o_gameservers,c_gameservers);
	//End function	
	});
}


async function monitorCheckIn(){
	//Start function
	const o_gameservers = {
		url: 'http://192.168.0.6:3001/api/push/D4FcTJ1QZN?status=up&msg=OK&ping='
	};
	
	async function c_gameservers(e_gameservers, r_gameservers, b_gameservers) {
		if (!e_gameservers && r_gameservers.statusCode == 200) {
			var myTimeStamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
			console.log(myTimeStamp + " - Checked in to UptimeKuma at 192.168.0.6");
		}
	}
	request(o_gameservers,c_gameservers);
	//End function
}

async function give_me_server_list(user_id,access_token){
	return new Promise(resolve => {
	const o_services = {
		url: 'https://api.nitrado.net/services/',
		headers: {
			'Authorization': access_token
		}
	};

	async function c_services(e_services, r_services, b_services) {
		if(r_services.statusCode==401){
		console.log("Token Expired Buddy");
			const o_refreshtoken = {
				url: 'https://beerbot.jonathonmorris.co.uk/ns/arkrefreshtoken.php?u='+user_id,
				headers: {
					'Authorization': access_token
				}
			};
			
			function c_refreshtoken(e_refreshtoken, r_refreshtoken, b_refreshtoken) {
				if (!e_refreshtoken && r_refreshtoken.statusCode == 200) {
					const rtokenlog = b_refreshtoken;
				}
			};
			request(o_refreshtoken,c_refreshtoken)
		}

		if (!e_services && r_services.statusCode == 200) {
			const nitrapi_services = JSON.parse(b_services);
			requested_data=nitrapi_services['data']['services'];
			//resolve(requested_data);
			//
			let servers = await Promise.all(
					requested_data.map(async (server) =>{
						const mylog = [];
						mylog['serverinfo']=await give_me_gameserver_info(user_id,server['id'],access_token);
						mylog['serverdetails']=server;
						mylog['linkage']=access_token;
						return mylog;
					})
				);
				resolve(servers);
			//
		}
	}
	request(o_services,c_services);
	});
}

async function give_me_player_list(server_id,user_id,access_token){
	return new Promise(resolve => {
	//Start function
	const o_gameservers = {
		url: 'https://api.nitrado.net/services/'+server_id+'/gameservers/games/players',
		headers: {
			'Authorization': access_token
		}
	};
	
	async function c_gameservers(e_gameservers, r_gameservers, b_gameservers) {
		if(r_gameservers.statusCode==401){
			const o_refreshtoken = {
				url: 'https://beerbot.jonathonmorris.co.uk/ns/arkrefreshtoken.php?u='+user_id,
				headers: {
					'Authorization': access_token
				}
			};
			
			function c_refreshtoken(e_refreshtoken, r_refreshtoken, b_refreshtoken) {
				if (!e_refreshtoken && r_refreshtoken.statusCode == 200) {
					const rtokenlog = b_refreshtoken;
				}
			};
			request(o_refreshtoken,c_refreshtoken)
		}
		
		if (!e_gameservers && r_gameservers.statusCode == 200) {
			const nitrapi_services = JSON.parse(b_gameservers);
			responsedata=nitrapi_services['data']['players'];
			resolve(nitrapi_services['data']['players']);
		}
	}
	request(o_gameservers,c_gameservers);
	//End function	
	});
}
async function status_check(){
	//Create SQL connection
	let con = createConnection(config.mysql);

	con.on('error', function() {console.log('sql database connection timed out');});

	con.connect(err => {
		// Console log if there is an error
		if (err) return console.log(err);

		//Trigger status check (to show system still working)
		monitorCheckIn();

		//SQL - query all users 
		con.query(`SELECT DISTINCT(guild_id) FROM user_guild_link;`, async (guild_list_token, guild_list) => {
			guild_list.forEach(async(obj_guild_list) =>{
			
			guildlink=await client.guilds.cache.get(obj_guild_list['guild_id']);
			
			
				con.query('SELECT user_guild_link.guild_id,users.* FROM user_guild_link JOIN users ON user_guild_link.user_id=users.user_id WHERE user_guild_link.guild_id="'+obj_guild_list['guild_id']+'"', async (server_list_token, list_of_servers) => {
				
					var display_list;
					var all_server_status=true;
					var server_status_color="008000";
					var server_status_embed_details="";
					
					for(i=0;i<list_of_servers.length;i++){
						display_list = await give_me_server_list(list_of_servers[i]['user_id'],list_of_servers[i]['access_token']);
					}
					
					//Now we have a list of all servers we should check
					
					//Cycle each server and check the details of them
					for(s=0;s<display_list.length;s++){
						var obj=display_list[s];
						
						var PlayerDetails = await give_me_player_list(obj['serverinfo']['service_id'],obj['serverinfo']['user_id'],obj['linkage']);
						var player_list=[]
						var ttlPlayers=0;
						for(c_plyr=0;c_plyr<PlayerDetails.length;c_plyr++){
							if(PlayerDetails[c_plyr]['online']){
								ttlPlayers++;
								player_list.push(PlayerDetails[c_plyr]['name']);
							}
						}
						
						if(obj['serverdetails']['status']=="active")
						{
							if(obj['serverinfo']['status']=="started")
								serverstatus=":green_circle:";
							else if(obj['serverinfo']['status']=="active")
								serverstatus=":green_circle:";
							else if(obj['serverinfo']['status']=="stopping")
								serverstatus=":orange_circle:";
							else if(obj['serverinfo']['status']=="starting")
								serverstatus=":orange_circle:";
							else if(obj['serverinfo']['status']=="restarting")
								serverstatus=":orange_circle:";
							else
								serverstatus=":red_circle:";
						} else
							serverstatus=":red_circle:";
							
						
						if(obj['serverdetails']['details']['game'].includes("ARK: Survival Evolved (")){
							//Ark Strings: ARK: Survival Evolved (PS 4)
							var GameUserSetings = await give_me_game_user_settings(obj['serverinfo']['service_id'],obj['serverinfo']['username'],obj['linkage']);
							map_name=await convert_ark_map(obj['serverinfo']['settings']['config']['map']);
							
							server_status_embed_details = server_status_embed_details + "\n" + serverstatus + ' '+GameUserSetings['SessionName'] +'\n**Map**: '+map_name+'\n**Players**: '+player_list.join(', ')+'\n**Slots:** '+ttlPlayers+'/'+obj['serverdetails']['details']['slots']+'\n **Runtime:**'+ (((obj['serverdetails']['suspending_in']/60)/60)/24).toFixed(1)+' days';
						} else {
							server_status_embed_details = server_status_embed_details + "\n" + serverstatus + ' '+obj['serverdetails']['details']['name'] +'\n**Players**: '+player_list.join(', ')+'\n**Slots:** '+ttlPlayers+'/'+obj['serverdetails']['details']['slots']+'\n **Runtime:**'+ (((obj['serverdetails']['suspending_in']/60)/60)/24).toFixed(1)+' days';
						}
						
						if(obj['status']!=="active"){	//If at least 1 server is offline set a global status
							all_server_status=false;
							server_status_color="ffa500";
						}
					}
					
					//End checking all status of servers now push to discord
					//Check if this bot has previously added a message.
						let channel_status = await guildlink.channels.cache.find(c => c.name.includes("server-status"));
						//var channel_status = await guildlink.channels.cache.find(c => c.name.includes("server-status") && c.type === 'text')
						
						
						//Create embed item				
						const ssembed = new MessageEmbed()
							.setColor(server_status_color)
							.setURL('')
							.setTitle('Server Status')
							.setDescription('\n\n')
							//.setAuthor('Beer', '', '')
							.addFields(
								{ name: 'Server List', value: server_status_embed_details },
							)
							.setTimestamp(Date.now())
							.setFooter({text:'NitradoStatus by BeerBot'});
							
							//Check if we can edit and existing or have to create a new
							let createNew=true;
							
							try{
							await channel_status.messages.fetch({ limit: 100 }).then(messages => {
								//Iterate through the messages here with the variable "messages".
								messages.forEach(message => {
									if (message.author.bot){
										message.edit({embeds: [ssembed]});
										createNew=false;
									}
								})
							})
							}catch{console.log("encoutered an error");}
							
							
							
							if(createNew){
								channel_status.send({embeds: [ssembed]});
								//channel_status.send(ssembed);
							}
							
							con.end(function(err) {
								// The connection is terminated now
							});
					  
					  //If not create a message.
					
				});
			})
		});
	});
	setTimeout(status_check, 1800000);
}

client.login(token);
