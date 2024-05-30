const { chat } = require('./src/chat.js')

const output = chat("Could you tell me what this code does:", undefined, true)
console.log(output.data)