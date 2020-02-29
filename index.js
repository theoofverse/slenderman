const Discord = require('discord.js')
const bot = new Discord.Client();

const PREFIX = '>';

const ytdl = require("ytdl-core");

var version = ('V1.01')

var array1 = ['kids make me happy, there blood is sweeter then an adults and its easier to manipulate kids then adults', 'some kids dont have homes so i take advantage of that- end of story', 'dont speak or you will be next'];
var array2 = ['i dont have a race, or face', 'i am white u bi', 'no u'];
var array3 = ['yep im postive', 'nope that is false', 'duh', 'ask me later im busy kidnapping kids', 'well yeah', 'no absoutley not', 'never!', 'i dont know to be honest'];

var servers = [];

bot.on('ready', () =>{
    console.log('this kidnapper is online whoops lol');
    bot.user.setActivity('Little Kids', { type: 'WATCHING'}).catch(console.error);
})

bot.on('message', message=>{
    
    if(!message.content.startsWith(PREFIX)) return;
    let args = message.content.substring(PREFIX.length).split(" ");
    
    switch(args[0]){

        // NORMAL COMMANDS:

        case 'why-kids?':
            var result1 = Math.floor((Math.random() * array1.length))
            message.channel.send(array1[result1])
        break;
		case 'your-race':
            var result2 = Math.floor((Math.random() * array2.length))
            message.channel.send(array2[result2])
        break;
		case 'random8ball':
		    if(!args[1]){
                message.channel.sendMessage('you didnt give me a question to answer idiot');
                return;
            }
			
            var result3 = Math.floor((Math.random() * array3.length))
            message.channel.send(array3[result3])
        break;


        // MUSIC:

        case 'play':

            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else{
                        connection.disconnect();
                    }
                });
            }

            if(!args[1]){
                message.channel.sendMessage('what should i play? put a link to a video of music after');
                return;
            }
            
            if(!message.member.voiceChannel){
                message.channel.sendMessage('join the music playing voice channel u bi-');
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message);
            });



        break;

        case 'skip':
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
        break;

        case 'stop':
            var server = servers[message.guild.id];
            if(message.guild.voiceConnection){
                for(var i = server.queue.length -1; i >=0; i--){
                    server.queue.splice(i, 1);
                }

                server.dispatcher.end();
                message.channel.sendMessage('ending it, no not my life sadly; the music')
            }

            if(message.guild.connection) message.guild.voiceConnection.disconnect();
        break;

        // INFO:
			
        case 'info':
            if(args[1] === 'version'){
                message.channel.sendMessage('your favourite child hunter is at version ' + version);
            }else{
                if(args[1] === 'you'){
                    message.channel.sendMessage('i am a Slender man bot whos main feature is to play music and kill children- what?');
                }else{
                    if(args[1] === 'kids'){
                        const embed = new Discord.RichEmbed()
                       .setTitle("Kids I've slaughturd")
                       .addField('John Micheal', 'loser')
                       .addField('Samantha Brandon', 'nerd')
                       .addField('Humacufa Prologo', 'weird name')
                       .addField('Juliet Rasberry', 'fairy tale copy')
					   .addField('Timithy Young', 'he got bullied lol')
                       .addField('Marco Alexander', 'hes russian')
                       .addField('Kevin Brown', 'THAT SON OF A BI-')
                       .addField(message.author.username, 'you are next')
                       .setColor(10038562)					   
                        message.channel.sendEmbed(embed);
                    }else{
						if(args[1] === 'music'){
                             message.channel.sendMessage('put the command ">play [link]" to play a music loop, put the command ">skip" to skip one on the queue, and put the command ">stop" to stop any music that is playing');
						}else{
                             message.channel.sendMessage('what info?')
                        }
                    }
            }
        }
            
        break;
        
        // PRIVATES

        case 'police':
            message.author.send("**You dare call the police, and you're next**")
        break;  

        // USER COMMANDS:

        case 'stab':
            if(!message.member.roles.find(r => r.name === "Virgin")) return message.channel.sendMessage('you are not an epic memer lol')

            const user = message.mentions.users.first();

            if(user){
                const member = message.guild.member(user);

                if(member){
                    member.kick('you have been stabbed my child!').then(() =>{
                        message.channel.sendMessage(`i have now stabbed ${user.tag}`)
                    }).catch(err =>{
                        message.reply("the knife is gone! i can't stab him!")
                        console.log(err);
                    });
                } else{
                    message.reply("who? i dont see them")
                }
            }else {
                message.reply("where")
            }
        break; 
        case 'kill':
            if(!message.member.roles.find(r => r.name === "Virgin")) return message.channel.sendMessage('you are not an epic memer lol')

            const user2 = message.mentions.users.first();

            if(user2){
				const member2 = message.guild.member(user2);
				
                if(member2){
                    member2.ban({ression: 'you are worse then satan'}).then(() =>{
                        message.channel.sendMessage(`${user2.tag} has been killed lol`)
                    })
                } else{
                    message.reply("who? i dont see them")
                }
            }else {
                message.reply("where")
            }
        break; 
    }
})

bot.login(process.env.BOT_TOKEN);
