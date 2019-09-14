const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
global.fetch = require('node-fetch');
const { UserPoolId, ClientId } = require('./config');
const {getBodyData}= require('./utils')

exports.handler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        let reqData=getBodyData(event);
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
        cognitoUser.confirmRegistration(reqData.otp, true, function (err, result) {
            if (err) {
               return callback({status:false,meesage:err},null)
            }
            callback(null,{status:true,message:'Your email verified sucessfully'});
        });


    } catch (err) {
        callback({status:false,message:'Some thing went to wrong'},null);

    }

}