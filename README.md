# Blackbox AI

- This is a reverse engineered Node.js API wrapper for [blackbox.ai](https://blackbox.ai/)

## Installation

```bash
npm i @ozrageharm/blackbox-ai
```

## Usage
- This is an example of what using the AI could look like, this example uses Deepseek's R1 model

```javascript
const blackbox = require('@ozrageharm/blackbox-ai'); // import the library

// call the 'chat' function and input an ai model 
// (ex. deepseek r1) and enter a query, 
// then output the result to the console
const output = blackbox.chat(blackbox.models.deepseek.r1, "Hello, how are you?").data;
console.log(output);
```

## Features

- The AI can use a specified file to better understand your prompt:

```javascript
const blackbox = require('@ozrageharm/blackbox-ai'); // import the library

// The AI uses the specified file to answer your query
const output = blackbox.chat(blackbox.models.deepseek.r1, "What does this code do?", "index.js").data;
console.log(output);
```

- The AI can use your entire codebase for better understanding of your program:

```javascript
const blackbox = require('@ozrageharm/blackbox-ai'); // import the library

// The AI uses your entire project files to answer your query
const output = blackbox.chat(blackbox.models.deepseek.r1, "What can my code do?", undefined, true).data;
console.log(output);
```

## Parameters:
`model`: string
*The model to use for the chat (e.g., 'deepseek-ai/DeepSeek-V3').*

`query`: string
*The user's query or message to send to the AI.*

`file`: string (optional)
*Optional path to a file whose content will be included in the query.*

`useCodebase`: boolean (optional, default: false)
*Whether to include the entire codebase in the query.*