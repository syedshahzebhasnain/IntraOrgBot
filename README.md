# IntraOrgBot
Slackbot that helps employees internally find the right person for the job


## Description
IntraOrgBot is a Slackbot designed to streamline internal communication within an organization. Its main purpose is to help employees find the right person for a specific job or task. By leveraging the power of Slack's messaging platform and LLM ( In this instance, its Groq), IntraOrgBot enables users to quickly search for and connect with colleagues who have the expertise or knowledge needed to get the job done.

## Setup
To set up IntraOrgBot, follow these steps:

1. Clone the repository to your local machine:
    ```
    git clone https://github.com/syedshahzebhasnain/IntraOrgBot.git
    ```

2. Install the required dependencies:
    ```
    npm install
    ```

3. Create and setup Slack app. Details below

4. Setup Groq Api and obtain credentials

5. Ensure that you have created the local.json file with the config details as mentioned in the slack app and groq setup

6. Setup your org file in the data/org-data.json file. 

7. Start the bot:
    ```
    npm run start
    ```


## Setup Slack App


To set up the Slack app, follow these steps:

1. Go to the [Slack API website](https://api.slack.com/apps) and create a new app.

2. Configure the app settings, including the app name, description, and icon.

3. In Settings-> Socket Mode, please enable Socket Mode as this code uses socket mode explicitly

4. In Features-> Slash Commands, create a new command called `/hello`. This code uses it as health check.

5. In Features-> Event Subscription, Enable Events. Also, subscribe to `app_mention` event

6. Install the app to your workspace by clicking on the "Install App to Workspace" button.

7. In Settings-> Install app, Get the Oauth Token for Workplace and put in the `token` config. 

8. In Settings-> Basic Information, Get the signing secret and plug it into `signingSecret` 

9. In Settings-> Basic Information, Go to App-Level Tokens, generate app level token with `connections:write` and `authorizations:read` and add this to `appToken` in config

10. Enable the WebSocket mode for your app by going to the "Features" section and enabling the "Enable Events" toggle.

11. Save the changes and your Slack app will now be set up running


## Setup Groq API

To set up the Groq API, follow these steps:

1. Register for a Groq API account on the Groq website.

2. Obtain your API key from the Groq dashboard.

3. In your config file, add them to groqConfig -> apiKey. Please dont share or commit anywhere


## How to run the bot

To quickly check if the bot is working , call the `/hello` command !
To ask any question about the organization, just tag the bot and ask right away
eg. 
    ```
   @Orgbot, who can help me with backend tasks if XYZ is Out of Office and their boss isnt responding`
    ````

