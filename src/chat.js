const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * Sends a chat query to the Blackbox AI API.
 *
 * @param {string} model - The model to use for the chat (e.g., 'deepseek-ai/DeepSeek-V3').
 * @param {string} query - The user's query or message to send to the AI.
 * @param {string} [file] - Optional path to a file whose content will be included in the query.
 * @param {boolean} [useCodebase=false] - Whether to include the entire codebase in the query.
 * @returns {Promise<string>} The response from the AI after processing the query.
 */
function chat(model, query, file, useCodebase = false) {
  const url = 'https://api.blackbox.ai/api/chat';

  let codebaseContent = '';

  if (useCodebase) {
    const rootDir = process.cwd();
    walkDir(rootDir, (filePath, fileContent) => {
      if (!filePath.includes('package.json') && 
        !filePath.includes('package-lock.json') && 
        !filePath.includes('node_modules') && 
        !filePath.startsWith('.') && 
        filePath.indexOf('/')!== 0) {
        codebaseContent += `\n${filePath}\n\`\`\`${fileContent}\`\`\``;
      }
    });

    query += `\n${codebaseContent}`;
  } else if (file) {
    const fileContent = fs.readFileSync(path.resolve(file), 'utf8');
    query += "\n```" + fileContent + "```";
    query.replace(file, '');
  }

  const body = {
    messages: [
      {
        content: query,
        role: 'user',
      },
    ],
    model: model,
    max_tokens: '1024',
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let response;
  try {
    response = axios.post(url, body, config);
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