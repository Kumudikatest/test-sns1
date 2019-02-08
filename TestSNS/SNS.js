let AWS = require('aws-sdk');
const cognito_idp = new AWS.CognitoIdentityServiceProvider();
const sns = new AWS.SNS();

exports.handler = function (event, context, callback) {

	let receiver = event['receiver'];
	let sender = event['sender'];
	let message = event['message'];

	let isPromotional = true;

	console.log("Sending message", message, "to receiver", receiver);

	sns.publish({
		Message: message,
		MessageAttributes: {
			'AWS.SNS.SMS.SMSType': {
				DataType: 'String',
				StringValue: 'Promotional'
			},
			'AWS.SNS.SMS.SenderID': {
				DataType: 'String',
				StringValue: sender
			},
		},
		PhoneNumber: receiver
	}).promise()
		.then(data => {
			console.log("Sent message to", receiver);
			callback(null, data);
		})
		.catch(err => {
			console.log("Sending failed", err);
			callback(err);
		});
	cognito_idp.listUsers({
		UserPoolId: "us-east-1_D10y3fy0o",
		Limit: "10"
	}, function (error, data) {
		if (error) {
			// implement error handling logic here
			throw error;
		}
		// your logic goes within this block
	});
	sns.listSubscriptionsByTopic({
		TopicArn: 'arn:aws:sns:us-east-1:318300609668:dynamodb'
	}).promise()
		.then(data => {
			// your code goes here
		})
		.catch(err => {
			// error handling goes here
		});



	callback(null, 'Successfully executed');
}