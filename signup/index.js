const AmazonCognitoIdentity = require('amazon-cognito-identity-js-node');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;
const { UserPoolId, ClientId } = require('./config');
const { getBodyData } = require('./utils');


exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const poolData = {
      UserPoolId: UserPoolId,
      ClientId: ClientId,
    };
    const userPool = new CognitoUserPool(poolData);
     let reqBody = getBodyData(event);
    // console.log(JSON.stringify(event));

    // Define User Attributes
    const attributeList = [];
    const dataEmail = {
      "Name": "email",
      "Value": reqBody.email

    };
    const dataName = {
      "Name": 'name',
      "Value": reqBody.name
    };

    const dataPhone = {
      "Name": 'phone_number',
      "Value": reqBody.phone_number
    };

    attributeList.push(new CognitoUserAttribute(dataEmail.Name, dataEmail.Value));
    attributeList.push(new CognitoUserAttribute(dataPhone.Name, dataPhone.Value));
    attributeList.push(new CognitoUserAttribute(dataName.Name, dataName.Value));
    userPool.signUp(reqBody.email, reqBody.password, attributeList, null, function (err, result) {
      if (err) {
        return callback({ status: false, message: 'Something went wrong', err: err }, null);
      }
      callback(null, { status: true, message: "Request proceesed sucessfully" });

    });

  } catch (err) {
    console.log('err',err);
    callback({ status: false, message: 'Something went wrong', err: err }, null);

  }

}

//local Testing

// exports.handler({
//   "resource": "/signup",
//   "path": "/signup",
//   "httpMethod": "POST",
//   "headers": {
//       "Accept": "*/*",
//       "accept-encoding": "gzip, deflate",
//       "Cache-Control": "no-cache",
//       "Content-Type": "application/json",
//       "Host": "2f7gbc1ale.execute-api.us-east-2.amazonaws.com",
//       "Postman-Token": "2276a11d-9f89-460c-885f-5a7b78fc33e0",
//       "User-Agent": "PostmanRuntime/7.15.0",
//       "X-Amzn-Trace-Id": "Root=1-5d7d22a7-96cf0e183961c250b2091fb4",
//       "X-Forwarded-For": "203.192.204.77",
//       "X-Forwarded-Port": "443",
//       "X-Forwarded-Proto": "https"
//   },
//   "multiValueHeaders": {
//       "Accept": [
//           "*/*"
//       ],
//       "accept-encoding": [
//           "gzip, deflate"
//       ],
//       "Cache-Control": [
//           "no-cache"
//       ],
//       "Content-Type": [
//           "application/json"
//       ],
//       "Host": [
//           "2f7gbc1ale.execute-api.us-east-2.amazonaws.com"
//       ],
//       "Postman-Token": [
//           "2276a11d-9f89-460c-885f-5a7b78fc33e0"
//       ],
//       "User-Agent": [
//           "PostmanRuntime/7.15.0"
//       ],
//       "X-Amzn-Trace-Id": [
//           "Root=1-5d7d22a7-96cf0e183961c250b2091fb4"
//       ],
//       "X-Forwarded-For": [
//           "203.192.204.77"
//       ],
//       "X-Forwarded-Port": [
//           "443"
//       ],
//       "X-Forwarded-Proto": [
//           "https"
//       ]
//   },
//   "queryStringParameters": null,
//   "multiValueQueryStringParameters": null,
//   "pathParameters": null,
//   "stageVariables": null,
//   "requestContext": {
//       "resourceId": "a0x16t",
//       "resourcePath": "/signup",
//       "httpMethod": "POST",
//       "extendedRequestId": "ABJaQEp0CYcFe-A=",
//       "requestTime": "14/Sep/2019:17:25:59 +0000",
//       "path": "/dev/signup",
//       "accountId": "787698415498",
//       "protocol": "HTTP/1.1",
//       "stage": "dev",
//       "domainPrefix": "2f7gbc1ale",
//       "requestTimeEpoch": 1568481959968,
//       "requestId": "0d003caa-328a-491a-8264-0339bfa4812d",
//       "identity": {
//           "cognitoIdentityPoolId": null,
//           "accountId": null,
//           "cognitoIdentityId": null,
//           "caller": null,
//           "sourceIp": "203.192.204.77",
//           "principalOrgId": null,
//           "accessKey": null,
//           "cognitoAuthenticationType": null,
//           "cognitoAuthenticationProvider": null,
//           "userArn": null,
//           "userAgent": "PostmanRuntime/7.15.0",
//           "user": null
//       },
//       "domainName": "2f7gbc1ale.execute-api.us-east-2.amazonaws.com",
//       "apiId": "2f7gbc1ale"
//   },
//   "body": "{\n\t\"email\":\"test@mailinator.com\",\n\t\"password\":\"Pawan123@\",\n\t\"phone_number\":\"+919620687270\",\n\t\"name\":\"Ram\"\n}",
//   "isBase64Encoded": false
// },{},(err,data)=>{
//   if(err) console.log(err);
//   else console.log(data);
// })