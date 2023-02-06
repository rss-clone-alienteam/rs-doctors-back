import { APIGatewayProxyEvent } from 'aws-lambda';

export const getBody = <T>(event: APIGatewayProxyEvent): T =>
  event.body ? JSON.parse(event.body) : {};
