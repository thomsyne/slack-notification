const core = require("@actions/core");
const fetch = require("node-fetch");

async function run() {
  try {
    const commitUrl = core.getInput("commitUrl", { required: true });
    const timestamp = new Date().getTime() / 1000;
    const environment = process.env.ENVIRONMENT;

    const colorCode = process.env.COLOR_CODE;
    const titleText = process.env.TITLE_TEXT;
    const titleUrl = process.env.TITLE_URL;

    const fieldTitle = process.env.FIELD_TITLE;
    const deployStatus = process.env.DEPLOY_STATUS;
    const logStreamURL = process.env.LOG_STREAM_URL;

    const serviceName = process.env.SERVICE_NAME;
    const serviceLink = process.env.SERVICE_LINK;
    const serviceType = process.env.SERVICE_TYPE;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    const payload = {
      attachments: [
        {
          fallback: logStreamURL
            ? `${serviceName} Deployment Details: <${logStreamURL}|Deploy Log Stream>`
            : `${serviceName} Deployment Details`,
          pretext: logStreamURL
            ? `${serviceName} Deployment Details: <${logStreamURL}|Deploy Log Stream>`
            : `${serviceName} Deployment Details`,
          color: colorCode,
          fields: [
            {
              title: `${serviceName} Deployment Status on ${environment}`,
              value: deployStatus,
              short: false,
            },
            {
              title: "Github Commit",
              value: `Commit Link: <${commitUrl}|View Changes on Github>`,
              short: false,
            },
            {
              title: `${serviceType}`,
              value: `Service Link: <${serviceLink}$|View Service in Console>`,
              short: false,
            },
          ],
          ts: timestamp.toString(),
        },
      ],
    };

    // Convert the payload to a JSON string
    const jsonPayload = JSON.stringify(payload);

    sendSlackMessage(slackWebhookUrl, jsonPayload);
  } catch (error) {
    core.setFailed(error.message);
  }
}

function sendSlackMessage(slackWebhookUrl, jsonPayload) {
  // Send the payload to the Slack webhook
  fetch(slackWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonPayload,
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error("Error posting message to Slack:", error));
}

run();
