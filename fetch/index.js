const AWS = require("aws-sdk");
const { accessKeyId, secretAccessKey,region } = require('./config');
let docClient = new AWS.DynamoDB.DocumentClient();
const {getPrincipals}= require('./utils');

AWS.config.update({
    region: region,
    accessKeyId: accessKeyId, secretAccessKey: secretAccessKey
});



exports.handler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        const params = {
            TableName: 'products'
            
        };
    
        let scanResults = [];
        let items;
        do{
            items =  await docClient.scan(params).promise();
            items.Items.forEach((item) => scanResults.push(item));
            params.ExclusiveStartKey  = items.LastEvaluatedKey;
        }while(typeof items.LastEvaluatedKey != "undefined");
    
         
        callback(null, scanResults);
    } catch (err) {
        callback(err, null);

    }
}

