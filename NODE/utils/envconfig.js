require("dotenv").config();

const { cleanEnv, str, port, host } = require("envalid");
const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "production"],
    default: "development",
  }),
  PORT: port({ default: 5000 }),
  HOST: host({ devDefault: "localhost" }),
  BASE_URL: str({ devDefault: "http://localhost:5000" }),
  JWT_SECRET: str({
    devDefault:
      "ashdfigfbaskjhdfalohalkjshbaisdfug[]jashgdvfk2aius@sdbfaskjbvkas",
  }),
  JWT_EXPIRE: str({ devDefault: "30d" }),
  SESSION_SECRET: str({ devDefault: "your-secret-key" }),
  MONGO_URL: str({
    devDefault:
      "mongodb+srv://nobita9699:xgFi1COLriKTuji7@cluster0.uh0srwc.mongodb.net/?retryWrites=true&w=majority",
  }),
  DB_NAME: str({ devDefault: "UserDetails" }),
  EMAIL_USER: str({ devDefault: "nobita9699@gmail.com" }),
  EMAIL_PASS: str({ devDefault: "dmkaqzjwoqnxjfcs" }),
  EMAIL_SERVICE: str({ devDefault: "gmail" }),
});

module.exports = { env };
/*
import { cleanEnv, str, port, host, testOnly } from "envalid";

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "production"],
    default: "development",
  }),
  PORT: port({ default: 5000 }),
  HOST: host({ devDefault: "localhost" }),
  BASE_URL: str({ devDefault: "http://localhost:5000" }),
  JWT_SECRET: str({
    devDefault:"key",
  }),
  JWT_EXPIRE: str({ devDefault: "30d" }),
  SESSION_SECRET: str({ devDefault: "your-secret-key" }),
  MONGO_URL: str({
    devDefault:"mongodb://localhost:27017/UserDetails"
,
  }),
  DB_NAME: str({ devDefault: "UserDetails" }),
  EMAIL_USER: str({ devDefault: "email"}),
  EMAIL_PASS: str({ devDefault: "password"}),
  EMAIL_SERVICE: str({ devDefault: "gmail" }),
});

*/
