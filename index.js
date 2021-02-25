const Discord = require("discord.js")
const client = new Discord.Client()

const {
  prefix
} = require("./config/main.json")
const fs = require("fs")
const token = fs.readFileSync("./config/token.txt", 'utf-8')
const comm = require("./functions/command.js")
const modules = require("./functions/modules")

console.log(token)

client.on('ready', async () => {
  console.log(`bot aktif!`)
  client.user.setPresence({
    activity: {
      name: "developing",
      type: 0
    }
  })
})

comm(client, "emoji", msg => {
  const {guild} = msg
  
  const emote = guild.emojis.cache
  const com = msg.content.replace(`${prefix}emoji `, "").match(/"[^"]+"|[^\s]+/g).map(e => e.replace(/"(.+)"/, "$1"))

  const type_list = ["all", "string", "emote", "code"]
  const type = ["both", "animated", "static"]
  
  

  switch (com[0]) {
    case 'list':
      // list, tipe_list, type
      com.shift()

      if (type.includes(com[1])) {
        if (type_list.includes(com[2]))
          return false
      }

      if (!msg.member.hasPermission('MANAGE_CHANNELS') || !msg.member.hasPermission('ADMINISTRATOR')) {
        if (com[0] === 'code') {
          msg.channel.send("Access denied!!!")
          return false
        }
      }

      if (com.length === 0 || type_list.includes(com[0]))
        com.push("both")

      if (type.includes(com[0]))
        com.unshift("all")

      console.log(com)
      msg.channel.send(`All emoji list from **__${guild.name}__**:`)

      emote.forEach(emoji => {

        if (emoji.animated && ['both', 'animated'].includes(com[1])) {
          console.log(emoji.name)

          modules.emote(emoji, com[0], msg, true)

        }

        if (!emoji.animated && ['both', 'static'].includes(com[1])) {
          console.log(emoji.name)

          modules.emote(emoji, com[0], msg)

        }

      })
      break;

    case 'search':
      // search, emote, tipe_list, type
      com.shift()

      if (com.length === 0) {
        msg.channel.send('Input your search!\n' + prefix + 'search **__Input search here__** **[all/emote/string/code]** **[both/animated/static]**\n\n`[] optional`')
        return false
      }

      console.log(com)
      const result = com[0]
      com.shift()
      console.log(com)

      if (type.includes(com[1])) {
        if (type_list.includes(com[2]))
          return false
      }

      if (!msg.member.hasPermission('MANAGE_CHANNELS') || !msg.member.hasPermission('ADMINISTRATOR')) {
        if (com[0] === 'code') {
          msg.channel.send("Access denied!!!")
          return false
        }
      }

      if (com.length === 0 || type_list.includes(com[0]))
        com.push("both")

      if (type.includes(com[0]))
        com.unshift("all")

      let search = false

      emote.forEach(e => {
        if (e.name.toLowerCase().includes(result.toLowerCase())) search = true
      })

      if (search === true) {

        msg.channel.send(`Find keyword ***${result}*** from **__${guild.name}__**:`)

        emote.forEach(emoji => {

          if (emoji.name.toLowerCase().includes(result.toLowerCase())) {

            if (emoji.animated && ['both', 'animated'].includes(com[1])) {
              console.log(emoji.name)

              modules.emote(emoji, com[0], msg, true)

            }

            if (!emoji.animated && ['both', 'static'].includes(com[1])) {
              console.log(emoji.name)

              modules.emote(emoji, com[0], msg)

            }
          }

        })
      } else {
        msg.channel.send(`Emote from keyword ***${result}*** not Found!`)
      }

      break;

    case 'get':
      // get, name_icon, type_callback
      const type_callback = ["emote",
        "id",
        "code"]
      com.shift()
      console.log(com)

      if (com.length === 0) {
        msg.channel.send('Input your emote!\n' + prefix + 'get **__Name emote__** **[emote/id/code]**\n\n`[] optional`')
        return false
      }

      if (!msg.member.hasPermission('MANAGE_CHANNELS') || !msg.member.hasPermission('ADMINISTRATOR')) {
        if (com[1] === 'code') {
          msg.channel.send("Access denied!!!")
          return false
        }
      }

      if (com.length === 1)
        com.push('emote')

      let found = false
      emote.forEach(emoji => {
        if (com[0] === emoji.name) {
          console.log(emoji.id + ': ' + emoji.name)
          found = true

          if (['emote', 'code'].includes(com[1])) {
          
          msg.channel.send(`${(com[1]==='code')?'Code e':'E'}moji for ${emoji.name}`)
          
            modules.emoteGet(emoji,com[1],msg,emoji.animated)
            
          } else if (com[1] === 'id')
            msg.channel.send(`ID for ***${emoji.name}*** is: ${emoji.id}`)
        }
      })

      if (!found)
        msg.channel.send(`emoji **${com[0]}** not found in this server!`)

      break;

    default:
      return false;
      break;
  }

})

client.login(token)