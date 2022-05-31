import * as dotenv from 'dotenv';
import { ExtractJwt } from 'passport-jwt';
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  name: process.env.NAME || 'nest-app',
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
    synchronize: true,
    logging: process.env.DEV ? true : false,
    /*ssl: {
      rejectUnauthorized: false
    },*/
  },
  JwtModules: {
    secretOrKey: process.env.JWT_SECRET,
    expiresIn: Number(process.env.TIME_JWT_EXPIRATION)
  },
  Jwt: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: false
  },
};
