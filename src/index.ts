import * as awsServerlessExpress from 'aws-serverless-express';
import app from './main';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
const server = awsServerlessExpress.createServer(app);

exports.handler = (event: APIGatewayProxyEvent , context: Context) => {
  awsServerlessExpress.proxy(server, event, context);
};