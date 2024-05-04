# Node.js Telegram Bot Backend Application

This Node.js backend application utilizes the gramjs library to interact with Telegram APIs and create a Telegram bot.

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
2. Install dependencies by running `npm install`.
3. Create a `.env` file in the root directory of your project.
4. Add the following environment variables to the `.env` file:

```plaintext
TELEGRAM_API_ID=your_telegram_api_id
TELEGRAM_API_HASH=your_telegram_api_hash
MONGODB_URI=your_mongo_db_url
