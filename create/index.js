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
        let data = getBodyData(event);
        let adminId=getPrincipals(event);
        if (!data||!adminId) {
          return cb({status:false,message:'Invalid Input'},null);
        }
        let params = {
            TableName: 'products',
            Item: {
                "PRODUCT_NAME": data.PRODUCT_NAME,
                "PRICE": data.PRODUCT_PRICE,
                "QTY": data.PRODUCT_QTY,
                "ADMIN_ID":adminId

            }
        };
     let resp=await docClient.put(params).promise();
        callback(null, {status:true,meesage:'Item added sucessfully'});
    } catch (err) {
        callback(err, null);

    }
}

