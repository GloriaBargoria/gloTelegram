
# Telegram Backend with Node.js and TDLib

This Node.js backend interacts with the Telegram API using the TDLib and tdl libraries. It provides the following features:
1. Login with Telegram phone number, password (for 2-step verified users), and code.
2. Create geolocation groups that require joining by request.
3. Get nearby groups using latitude, longitude, and radius.
4. Join a group by invite link.


## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)



## Prerequisites

Before you start, ensure you have the following installed:

- Node.js and npm (Node Package Manager): [Download and Install Node.js](https://nodejs.org/)
- Telegram Account: You will need a Telegram account to create a bot and obtain API credentials.

## Getting Started

### 1. Creating a Telegram Bot

To create a Telegram bot, follow these steps:

1. Open the Telegram app and search for the BotFather (https://t.me/botfather).
2. Start a chat with the BotFather and use the `/newbot` command to create a new bot.
3. Follow the BotFather's instructions to choose a name and username for your bot.
4. Once your bot is created, the BotFather will provide you with a token. Save this token as it will be used to authenticate your bot with the Telegram API.

### 2. Registering Your Application

To interact with the Telegram API, you will need to register your application and obtain the App ID and API Hash. Follow these steps:

1. Go to the Telegram website and log in to your account: [Telegram Web](https://web.telegram.org/)
2. Visit the Telegram Developers Portal: [Telegram for Developers](https://my.telegram.org/auth)
3. Once logged in, navigate to the 'API development tools' section.
4. Create a new application by filling out the required information such as the name, description, and website.
5. After creating the application, you will be provided with the App ID and API Hash. Save these credentials securely.

### 3. Setting Up the Application

1. Clone this repository or download the source code.
2. Install the required dependencies:

   ```bash
   npm install


Setup

    Create a .env file in the root of your project and add your environment variables:

    ```plaintext

TELEGRAM_API_ID=your_api_id
TELEGRAM_API_HASH=your_api_hash
PORT = your_preferred_port (I am running on port 5000)
```

Replace your_api_id and your_api_hash with your actual Telegram API credentials, which you can obtain by registering your app on Telegram's website as in the steps above.

### 4. Usage
# Login

To login to Telegram, use the following steps in your backend:

   1. Import the necessary modules and initialize the client:

   ```javascript
   tdl.configure({ tdjson: getTdjson() });

    const apiId = process.env.TELEGRAM_API_ID;
    const apiHash = process.env.TELEGRAM_API_HASH;

    const tdclient = tdl.createClient({
    apiId: apiId,
    apiHash: apiHash,
    });



2. Authenticate the user with their phone number, password (if applicable), and code by making requests to the endpoint /telegram/login
3. Create a group by making a request to the endpoint 
``` 
    /telegram/create-tdchat

```

```json 
{
    "title": "string", 
    "latitude": float, 
    "longitude": float, 
    "username": "unique_string", 
    "description":"string"
}
```

4. get nearby groups by making POST request to the endpoint /telegram/nearby-groups

```json
{
    "latitude": float,
    "longitude": float
}
```

5. Join groups by invite link (request to join group) by making request to endpoint /telegram/join-tdchat
 ```json
 {
    "invite link": "link_string"
 }
 ```


