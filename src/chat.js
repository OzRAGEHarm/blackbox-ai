const axios = require('axios');
const fs = require('fs');
const path = require('path');

function chat(query, file, useCodebase) {
  const url = 'https://www.blackbox.ai/api/chat';

  let codebaseContent = '';

  if (useCodebase) {
    const rootDir = process.cwd();
    walkDir(rootDir, (filePath, fileContent) => {
      if (!filePath.includes('package.json') && !filePath.includes('package-lock.json') && !filePath.includes('node_modules') && !filePath.startsWith('.') && filePath.indexOf('/')!== 0) {
        codebaseContent += `\n${filePath}\n\`\`\`${fileContent}\`\`\``;
      }
    });

    query += `\n${codebaseContent}`;
  } else if (file !== undefined) {
    const fileContent = fs.readFileSync(path.resolve(file), 'utf8');
    query += "\n```" + fileContent + "```";
    query.replace(file, '')
  }

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
    previewToken: true,
    trendingAgentMode: {},
    visitFromDelta: null
  };

  let response;
  try {
    response = axios.post(url, body);
    response.then(res => {
      res.data = res.data.replace(/(\$\@\$.*?\$\@\$)/g, '');
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  let data;
  response.then(res => {
    data = res;
  }).catch(error => {
    console.error(error);
    throw error;
  });

  while (!data) {
    require('deasync').runLoopOnce();
  }

  return data;
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((fileOrDir) => {
    const filePath = path.join(dir, fileOrDir);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      if (!fileOrDir.startsWith('.') && filePath!== 'node_modules') {
        walkDir(filePath, callback);
      }
    } else if (stats.isFile()) {
      callback(filePath, fs.readFileSync(filePath, 'utf8'));
    }
  });
}

module.exports = {
  chat
}