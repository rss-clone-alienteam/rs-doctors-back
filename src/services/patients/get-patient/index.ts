import { APIGatewayProxyHandler } from 'aws-lambda';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from 'src/utils/aws/dynamo';
import { getEnvVariable } from 'src/utils/runtime';

const PATIENTS_TABLE = getEnvVariable('PATIENTS_TABLE');

export const handler: APIGatewayProxyHandler = async (event) => {
  const id = event?.pathParameters?.id;

  const params = {
    TableName: PATIENTS_TABLE,
    Key: {
      id: id,
    },
  };

  const data = await ddbDocClient.send(new GetCommand(params));

  return {
    statusCode: 200,
    body: JSON.stringify(data.Item),
  };
};
