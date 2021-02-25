module.exports.emote = (e, tl, msg, a = false) => {
  msg.channel.send(
    `${
    (['all', 'emote', 'code'].includes(tl))?`${(tl === 'code')?'\\': ''}<${(a)?'a': ''}:${e.name}:${e.id}> `: ''
    }${(['all', 'string'].includes(tl)?e.name: '')}`
  )
}

module.exports.emoteGet = (e, tg, msg, a) => {
  msg.channel.send(
    `${
    (tg === 'code')?'\\': ''
    }<${
    (a)?'a': ''}:${e.name}:${e.id}> `
  )
}