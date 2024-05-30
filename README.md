# Blackbox AI

**This is a reverse engineered Node.js API wrapper for [blackbox.ai](https://blackbox.ai/)**

## Installation

```bash
npm i @ozrageharm/blackbox-ai
```

## Usage
- This is how you can start interacting with Blackbox AI within your own code!

```javascript
const blackbox = require('@ozrageharm/blackbox-ai')

const output = blackbox.chat("Hello, how are you today?") // Sends the query to blackbox ai
console.log(output.data) // logs the text response the ai gives
```

## Features

- **Blackbox AI can use your code in your query by passing the file name as a parameter into the "chat" function**

```javascript
const blackbox = require('@ozrageharm/blackbox-ai')

const output = blackbox.chat("What does this code do?", "index.js") 
console.log(output.data)
```

- **Blackbox AI can use your entire codebase to be able to help with your coding problems**

```javascript
const blackbox = require('@ozrageharm/blackbox-ai')

const output = blackbox.chat("What does this code do?", undefined, true)
console.log(output.data)
```

## Parameters
- **query** - The query you want to send to blackbox ai - 1st parameter
- **filename** - The file name of the code you want to send to blackbox ai - 2nd parameter (optional, if using entire codebase, set to "undefined")
- **codebase** - Whether you want to use your entire codebase for the query - 3rd parameter (optional, if using filename parameter, then either set to "false" or leave blank)