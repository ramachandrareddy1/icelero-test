const AWS = require("aws-sdk");
const { accessKeyId, secretAccessKey,region } = require('./config');
let docClient = new AWS.DynamoDB.DocumentClient();
const {getBodyData,getPrincipals}= require('./utils');
AWS.config.update({
    region: region,
    accessKeyId: accessKeyId, secretAccessKey: secretAccessKey
});

exports.handler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        let reqData=getBodyData(event);
        let adminId= getPrincipals(event);
        let params = {
            TableName: 'products',
            
            Key:{
                "PRODUCT_NAME":reqData.PRODUCT_NAME
            },
            ConditionExpression:"ADMIN_ID == :adminId",
            ExpressionAttributeValues: {
                ":adminId": adminId
            }
        };
     let resp=await docClient.delete(params).promise();
        callback(null, resp);
    } catch (err) {
        callback(err, null);

    }
}
