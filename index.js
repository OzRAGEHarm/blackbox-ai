const { chat } = require('./src/chat.js')

class api {
  constructor() {
    this.chat = chat
  }

  chat(query, file, useCodebase) {
    return this.chat(query, file, useCodebase);
  }
}

module.exports = new api();