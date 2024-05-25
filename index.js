const { chat } = require('./src/chat.js')

chat("hello, how are you?")
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(error);
  });