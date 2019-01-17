webhookProxy
=====================

This utility is an node.js AWS Lambda function to be used in conjunction with Runscope. The intention is to proxy a webhook notification, so you can do something else with it. As written, the function is designed to intercept a notification if a test fails because the Runscope Agent is disconnected. This avoids sending notifications for failures due to agent failure. **WARNING: IF YOU USE THIS PROXY AS CONFIGURED, YOU WILL MAY NOT KNOW THAT YOUR RUNSCOPE TEST IS FAILING TO RUN AS EXPECTED**

## Installation
If Node.js is not installed, install it from https://nodejs.org/. Once complete, check by running ```node -v``` from a terminal window to show the install version.

Clone the repo:
`git clone https://github.com/samaybar/webhookProxy.git`
`cd webhookProxy`

Install node module dependencies:
`npm install`

## How to Use

### Create a AWS Lambda Function
(This assumes you have some familiarity with AWS Lambda)

- Compress the files in the directory into a .zip file
- From the AWS Lambda console, create a new function
- Upload the compressed .zip file
- Add an **API Gateway** as a trigger. I recommend configuring as **Open with API key** but you can also choose **Open**  
- Copy the **API endpoint** and the *API key** to use in Runscope

### Configure the Advanced Webhook in Runscope

- From the top right Runscope icon choose **Connected Services**
- Under **webhooks** choose **Connect*
- Set your threshold as desired
- For the **URL** use the **API endpoint** you copied above
- Be sure to add the following headers:
```bash
Content-Type: application/json
x-api-key: [API key]
endurl: [The end destination to receive the webhook]
x-api: [This example assumes you have another header to send to your endpoint]
```

You can now use this advanced webhook with your Runscope tests. Webhook notifications will be sent to the **endurl** per your Threshold rules except if a test fails because of agent disconnection

### Additonal Customization

You can modify this code to have alternative notification in case the agent fails.