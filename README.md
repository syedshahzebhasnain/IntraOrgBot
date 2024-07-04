# IntraOrgBot
Slackbot that helps employees internally find the right person for the job


## Description
IntraOrgBot is a Slackbot designed to streamline internal communication within an organization. Its main purpose is to help employees find the right person for a specific job or task. By leveraging the power of Slack's messaging platform, IntraOrgBot enables users to quickly search for and connect with colleagues who have the expertise or knowledge needed to get the job done.

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

3. Create a new Slack app and obtain the necessary credentials (e.g., API token).

4. Configure the app by providing the required environment variables. You can either create a `.env` file in the project's root directory or set the variables directly in your deployment environment. The following variables need to be set:

    - `SLACK_API_TOKEN`: The API token for your Slack app.
    - `SLACK_SIGNING_SECRET`: The API token for your Slack app.

6. Start the bot:
    ```
    npm run start
    ```

Once the bot is up and running, it will be able to respond to commands and assist users in finding the right person within your organization.

