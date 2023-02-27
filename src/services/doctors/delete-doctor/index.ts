import { APIGatewayProxyHandler } from 'aws-lambda';
import { CognitoIdentityProviderClient, AdminDeleteUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from 'src/utils/aws/dynamo';
import { getEnvVariable } from 'src/utils/runtime';

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

const DOCTORS_TABLE = getEnvVariable('DOCTORS_TABLE');

export const handler: APIGatewayProxyHandler = async (event) => {
  const id = event?.pathParameters?.id;

  const deleteFromCognitoParams = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: id,
  };

  await client.send(new AdminDeleteUserCommand(deleteFromCognitoParams));

  const params = {
    TableName: DOCTORS_TABLE,
    Key: {
      id,
    },
  };

  await ddbDocClient.send(new DeleteCommand(params));

  return {
    statusCode: 200,
    body: 'Success!',
  };
};
