const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
global.fetch = require('node-fetch');
const { UserPoolId, ClientId } = require('./config');
const { getBodyData } = require('./utils');

exports.handler = async (event, context, callback) => {
    try {
        context.callbackWaitsForEmptyEventLoop = false;
        let reqData = getBodyData(event);
        let authenticationData = {
            Username: reqData.email,
            Password: reqData.Password,
        };
        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        const poolData = {
            UserPoolId: UserPoolId,
            ClientId: ClientId,
        };

        let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        let userData = {
            Username: reqData.email,
            Pool: userPool
        };

        let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                let accessToken = result.getAccessToken().getJwtToken();
                callback(null, { status: true, token: accessToken });
              
            }, onFailure: function (err) {
                callback({ status: false, message: err }, null);
            
            }
        });


    } catch (err) {
        callback({ status: false, message: err }, null);


    }

}