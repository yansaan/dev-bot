
      if (com.length === 2) {
        client.guilds.cache.forEach(guild => msg.channel.send(`All emoji list from **__${guild.name}__**:`))

        emote.forEach(emoji => {
          msg.channel.send(
            (com.includes("show"))?`<${(emoji.animated)?'a': ''}:${emoji.name}:${emoji.id}> ${emoji.name}`: emoji.name
          )
        })
      } else {
        switch (com[1]) {
          case 'animated':
            client.guilds.cache.forEach(guild => msg.channel.send(`All animated emoji list from **__${guild.name}__**:`))

            emote.forEach(emoji => {
              if (emoji.animated)
                msg.channel.send(
                (com.includes("show"))?`<a:${emoji.name}:${emoji.id}> ${emoji.name}`: emoji.name
            )
            })
          break;

          case 'static':
            client.guilds.cache.forEach(guild => msg.channel.send(`All static emoji list from **__${guild.name}__**:`))

            emote.forEach(emoji => {
              if (!emoji.animated)
                msg.channel.send(
                (com.includes("show"))?`<:${emoji.name}:${emoji.id}> ${emoji.name}`: emoji.name
            )
            })
            break;
        }
      }