const { chat } = require('./src/chat.js')

class api {
  constructor() {
    this.chat = chat
  }

  async chat(query, file, useCodebase = false) {
    return await chat(query, file, useCodebase);
  }
}

module.exports = new api();