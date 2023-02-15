import { APIGatewayProxyHandler } from 'aws-lambda';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from 'src/utils/aws/dynamo';
import { getBody } from 'src/utils/aws/lambda';
import { getEnvVariable } from 'src/utils/runtime';
import ISchedule from '../../../types/ISchedule';

const SCHEDULE_TABLE = getEnvVariable('SCHEDULE_TABLE');

export const handler: APIGatewayProxyHandler = async (event) => {
  const data = getBody<ISchedule>(event);

  const schedule = {
    id: data.id,
    schedule: data.schedule,
  };

  const params = {
    TableName: SCHEDULE_TABLE,
    Item: schedule,
  };

  await ddbDocClient.send(new PutCommand(params));

  return {
    statusCode: 201,
    body: JSON.stringify(schedule),
  };
};
