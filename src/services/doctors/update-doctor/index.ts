import { APIGatewayProxyHandler } from 'aws-lambda';
import { getBody } from 'src/utils/aws/lambda';
import { UpdateCommand  } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient, getUpdateExpression, getUpdateValues } from 'src/utils/aws/dynamo';
import { getEnvVariable } from 'src/utils/runtime';

interface IDataUpdate {
  photo?: string,
  address?: string,
  phone?: string,
  education?: string,
  experience?: string,
  servicesSector?: string,
  price?: string,
  paymentMethod?: string,
  aboutMe?: string,
  languages?: string,
}

const DOCTORS_TABLE = getEnvVariable('DOCTORS_TABLE');

export const handler: APIGatewayProxyHandler = async (event) => {
  const id = event?.pathParameters?.id;

  const updateInfo = getBody<IDataUpdate>(event);

  const UpdateExpression = getUpdateExpression(updateInfo);
  const ExpressionAttributeValues = getUpdateValues(updateInfo);

  const params = {
    TableName: DOCTORS_TABLE,
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
