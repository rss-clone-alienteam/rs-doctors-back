import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
const marshallOptions = {
  convertEmptyValues: true,
  removeUndefinedValues: true,
};
export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, { marshallOptions });
