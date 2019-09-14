const AWS = require("aws-sdk");
const { accessKeyId, secretAccessKey,region } = require('./config');
const {getBodyData,getPrincipals} = require('./utils');

let docClient = new AWS.DynamoDB.DocumentClient();


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
            TableName:'products',
            Key:{
                "PRODUCT_NAME": reqData.PRODUCT_NAME
            },
            ConditionExpression:"ADMIN_ID == :adminId",
            UpdateExpression: "set PRODUCT_PRICE = :PRODUCT_PRICE, PRODUCT_QTY= :PRODUCT_QTY",
            ExpressionAttributeValues:{
                ":PRODUCT_PRICE":reqData.PRODUCT_PRICE,
                ":PRODUCT_QTY":reqData.PRODUCT_QTY,
                ":adminId": adminId

            },
            ReturnValues:"UPDATED_NEW"
        };
     let resp=await docClient.update(params).promise();
        callback(null, resp);
    } catch (err) {
        callback(err, null);

    }
}



exports.handler({}, {}, (err, res) => {
    if (err) console.log(err);
    else console.log(res);

})