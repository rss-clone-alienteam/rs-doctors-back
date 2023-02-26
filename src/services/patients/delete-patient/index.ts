import { APIGatewayProxyHandler } from 'aws-lambda';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from 'src/utils/aws/dynamo';
import { getEnvVariable } from 'src/utils/runtime';
import { CognitoIdentityProviderClient, AdminDeleteUserCommand } from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

const PATIENTS_TABLE = getEnvVariable('PATIENTS_TABLE');

export const handler: APIGatewayProxyHandler = async (event) => {
  const id = event?.pathParameters?.id;
  const deleteFromCognitoParams = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: id,
  };

  await client.send(new AdminDeleteUserCommand(deleteFromCognitoParams));

  const params = {
    TableName: PATIENTS_TABLE,
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
