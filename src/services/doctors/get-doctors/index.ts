import { APIGatewayProxyHandler } from 'aws-lambda';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { ddbDocClient } from 'src/utils/aws/dynamo';
import { getEnvVariable } from 'src/utils/runtime';

const DOCTORS_TABLE = getEnvVariable('DOCTORS_TABLE');

export const handler: APIGatewayProxyHandler = async (event) => {
  const category = event.queryStringParameters ? event.queryStringParameters.category : '';
  const city = event.queryStringParameters ? event.queryStringParameters.city : '';

  const params = {
    TableName: DOCTORS_TABLE,
    ExpressionAttributeValues: {
      ':category': { S: `${category}` },
      ':city': { S: `${city}` },
    },
    FilterExpression: 'category = :category and city = :city',
  };

  const data = await ddbDocClient.send(new ScanCommand(params));

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
