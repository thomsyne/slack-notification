# Slack Notifications Package

This package was developed with the aim of reducing the number of lines of code needed to send notifications to Slack.
It also abstracts the process of structuring the payload and eventually sending it to Slack. Additionally, it ensures consistency across all notifications sent to Slack for certain infrastructure types.

Sample Usage

```yaml
- name: Send Slack Notifications
  uses: thomsyne/slack-notification/@main
  with:
      commitUrl: 'https://github.com/${{ github.repository }}/commit/${{ github.sha }}'
  env:
      ENVIRONMENT: ${{ vars.ENVIRONMENT }}
      COLOR_CODE: ${{ vars.COLOR_CODE }}
      DEPLOY_STATUS: ${{ vars.DEPLOY_STATUS }}
      LOG_STREAM_URL: ${{ vars.LOG_STREAM_URL }}
      SERVICE_NAME: ${{ vars.SERVICE_NAME }}
      SERVICE_LINK: ${{ vars.SERVICE_LINK }}
      SERVICE_TYPE: ${{ vars.SERVICE_TYPE }}
      SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL}}
```

**N.B: It is highly encouraged that the environment values passed to the package are retrieved from Secrets and Variables under the Settings tab**

However, here are some sample values for the env values:

```ENVIRONMENT: staging```  
```COLOR_CODE: #008000```  
```DEPLOY_STATUS: Deployment successful! 🚀```  
```LOG_STREAM_URL: https://us-east-2.console.aws.amazon.com/cloudwatch/home?region=us-east-2#logsV2:log-groups/log-group/XXXXXXXX-XXXXXXXXXXXX-XXXXXXX/log-events```  
```SERVICE_NAME: API-v1```  
```SERVICE_LINK: https://us-east-2.console.aws.amazon.com/ecs/v2/clusters/XXXXXX-XXX/services/XXX/health?region=us-east-2```  
```SERVICE_TYPE: ECS/Fargate```  
```SLACK_WEBHOOK_URL: https://hooks.slack.com/services/XXXXXX/XXXXXXX/XXXXXXX```  

Final Output will look somewhat like this:

![Slack Notification Sample!](/img/slack-notification.png "Slack Notification")