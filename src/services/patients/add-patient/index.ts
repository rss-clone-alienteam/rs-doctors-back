import { APIGatewayProxyHandler } from 'aws-lambda';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from 'src/utils/aws/dynamo';
import { getBody } from 'src/utils/aws/lambda';
import { getEnvVariable } from 'src/utils/runtime';
import IPatient from 'src/types/IPatient';

const PATIENTS_TABLE = getEnvVariable('PATIENTS_TABLE');

export const handler: APIGatewayProxyHandler = async (event) => {
  const data = getBody<IPatient>(event);

  const patient = {
    id: data.id,
    email: data.email,
    city: data.city,
  };

  const params = {
    TableName: PATIENTS_TABLE,
    Item: patient,
  };

  await ddbDocClient.send(new PutCommand(params));

  return {
    statusCode: 201,
    body: JSON.stringify(patient),
  };
};
