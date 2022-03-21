import { ConnectionOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import * as fs from 'fs';
const environment = process.env.NODE_ENV || 'development';
const data = dotenv.parse(fs.readFileSync(`.${environment}.env`)) as any;

const config: ConnectionOptions = {
  type: data.DATABASE_TYPE,
  host: data.DATABASE_HOST,
  port: parseInt(data.POSTGRES_PORT),
  username: data.DATABASE_USERNAME,
  password: data.DATABASE_PASSWORD,
  database: data.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
