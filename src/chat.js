const axios = require('axios');

function chat(query) {
  const url = 'https://www.blackbox.ai/api/chat';

  const body = {
    agentMode: {},
    clickedAnswer2: false,
    clickedAnswer3: false,
    codeModelMode: true,
    githubToken: null,
    isChromeExt: false,
    isMicMode: false,
    messages: [
      {
        content: query,
        role: "user",
        data: {}
      },
    ],
    previewToken: null,
    trendingAgentMode: {},
    visitFromDelta: null
  };

  return axios.post(url, body)
    .then(response => {
      const index = response.data.indexOf(' ');
      const res = index !== -1 ? response.data.substring(index + 1) : response.data;
      return res;
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = {
  chat
}