# RS-DOCTORS-BACK

## Technologies
- AWS
- Serverless framework
- Dynamo DB
- Cognito (User pool, User client)
- Lambda
- S3
- REST architecture
- Microservices (doctors, patients, schedule)
- Github actions
- Typescript, eslint, esbuild

## Functionalities
- Managing doctors (GET, POST, UPDATE, DELETE) using Dynamo DB + API Gateway + Lambda
- Managing patients (GET, POST, UPDATE, DELETE) using Dynamo DB + API Gateway + Lambda
- Managing scheduling appointments (GET, POST) using AWS Dynamo DB + API Gateway + Lambda
- Authentication/Authorization using AWS Cognito
- Uploading photos(avatars) using S3
- Run linters and autodeploy to dev environment after merge to dev branch.

## Scripts
- Linting (using eslint)
`npm run lint`
- Start offline server
`npm start`
- Deploy to environment
`npm run deploy --stage {stage}` // default stage = dev
