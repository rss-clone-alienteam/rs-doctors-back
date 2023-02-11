import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const marshallOptions = {
  convertEmptyValues: true,
  removeUndefinedValues: true,
};
export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, { marshallOptions });

export const getUpdateExpression = <T>(data: T) => {
  let updateExpression = 'SET ';

  for (const property in data) {
    updateExpression += `${property} = :${property} ,`;
  }
  return updateExpression.slice(0, -2);
};

export const getUpdateValues = <T>(data: T) => {
  const values: Record<string, unknown> = {};

  for (const property in data) {
    values[`:${property}`] = data[property];
  }
  return values;
};
