const fs = require('fs');
const messages = require('./messages.json');

exports.newMessage = function(message, user){

  messages.push({
    'author': user,
    'content': message,
    'date': new Date(),
  })
  console.log(messages)
  fs.writeFile("./messages.json", JSON.stringify(messages), function(err) {
      if(err) {
          return 'FAIL'
      }
      return 'SUCSESS'
  });
}