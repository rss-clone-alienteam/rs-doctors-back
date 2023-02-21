import { APIGatewayProxyHandler } from 'aws-lambda';
import { getBody } from 'src/utils/aws/lambda';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import {
  ddbDocClient,
  getUpdateExpression,
  getUpdateValues,
} from 'src/utils/aws/dynamo';
import { getEnvVariable } from 'src/utils/runtime';
import { Appointment } from 'src/types/IPatient';

interface IDataUpdate {
  appointments?: Array<Appointment>;
}

const PATIENTS_TABLE = getEnvVariable('PATIENTS_TABLE');

export const handler: APIGatewayProxyHandler = async (event) => {
  const id = event?.pathParameters?.id;

  const updateInfo = getBody<IDataUpdate>(event);

  const UpdateExpression = getUpdateExpression(updateInfo);
  const ExpressionAttributeValues = getUpdateValues(updateInfo);

  const params = {
    TableName: PATIENTS_TABLE,
    Key: {
      id: id,
    },
    UpdateExpression,
    ExpressionAttributeValues,
  };

  const data = await ddbDocClient.send(new UpdateCommand(params));

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
