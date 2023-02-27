import { APIGatewayProxyHandler } from 'aws-lambda';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from 'src/utils/aws/dynamo';
import IDoctor from 'src/types/IDoctor';
import { getBody } from 'src/utils/aws/lambda';
import { getEnvVariable } from 'src/utils/runtime';

const DOCTORS_TABLE = getEnvVariable('DOCTORS_TABLE');

export const handler: APIGatewayProxyHandler = async (event) => {
  const data = getBody<IDoctor>(event);

  const doctor = {
    id: data.id,
    nameDoctor: data.name,
    surname: data.surname,
    category: data.category,
    email: data.email,
    city: data.city,
    photo: '',
    address: data.city,
    phone: '',
    education: '',
    experience: '',
    services: [],
    paymentMethod: '',
    aboutMe: '',
    languages: '',
    reviews: [],
  };

  const params = {
    TableName: DOCTORS_TABLE,
    Item: doctor,
  };

  await ddbDocClient.send(new PutCommand(params));

  return {
    statusCode: 201,
    body: JSON.stringify(doctor),
  };
};
