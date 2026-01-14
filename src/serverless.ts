// Serverless entry point for Vercel
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

let cachedApp: express.Express;

async function createServerlessApp(): Promise<express.Express> {
  if (cachedApp) {
    return cachedApp;
  }

  const expressApp = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // Health check endpoint
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/health', (req: any, res: any) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Root endpoint
  httpAdapter.get('/', (req: any, res: any) => {
    res.status(200).json({
      message: 'Meri Dukaan POS + Admin Analytics API',
      version: '1.0.0',
      documentation: `https://${req.headers.host}/api-docs`,
      endpoints: {
        health: `https://${req.headers.host}/health`,
        swagger: `https://${req.headers.host}/api-docs`,
      },
      timestamp: new Date().toISOString(),
    });
  });

  // Enable CORS
  app.enableCors();

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Meri Dukaan POS + Admin Analytics API')
    .setDescription('Complete API documentation for Meri Dukaan Point of Sale system with Admin Analytics')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Authentication', 'User authentication endpoints')
    .addTag('POS', 'Point of Sale operations')
    .addTag('Admin', 'Admin analytics and dashboard endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
    },
    customSiteTitle: 'Meri Dukaan API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  // Serve static files
  const storagePath = process.env.STORAGE_PATH || './storage';
  app.useStaticAssets(join(process.cwd(), storagePath), {
    prefix: '/storage/',
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.init();
  cachedApp = expressApp;
  return expressApp;
}

// Export handler for Vercel (CommonJS for compatibility)
module.exports = async (req: express.Request, res: express.Response) => {
  const app = await createServerlessApp();
  return app(req, res);
};

// Also export as default for ES modules
export default async (req: express.Request, res: express.Response) => {
  const app = await createServerlessApp();
  return app(req, res);
};
