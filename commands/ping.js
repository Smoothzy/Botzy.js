module.exports = {
    category: 'Testing',
    description: 'Replies with pong',
    slash: 'both',
    permissions: ["BAN_MEMBERS"],

    
    callback: ({ message, interaction }) => {
      const reply = 'Pong!'
  
      if (message) {
        message.reply({
          content: reply
        })
        return
      }
  
      interaction.reply({
        content: reply
      })
      
    },
  }