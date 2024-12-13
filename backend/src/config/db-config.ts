import oracledb, { type Pool, type PoolAttributes } from "oracledb";
import{env} from '../env'
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];
oracledb.autoCommit = true;

export const connectionAttributes: PoolAttributes = {
  events: true,
  user: env.USER_NAME,
  password: env.PASSWORD,
  connectString: env.CONNECTION_STRING,
  poolMin: env.DB_POOL_MIN ? parseInt(env.DB_POOL_MIN, 10) : 1,
  poolMax: env.DB_POOL_MAX ? parseInt(env.DB_POOL_MAX, 10) : 2,
  poolIncrement: env.DB_POOL_INC ? parseInt(env.DB_POOL_INC, 10) : 1,
  poolTimeout: 60 * 3,
  queueTimeout: 0,
};

export let connectionPool: Pool;



export const createConnectionPool = async () => {
  connectionPool = await oracledb.createPool(connectionAttributes);
};

export const closeConnectionPool = async () => {
  if (connectionPool) {
    await connectionPool.close();
  }
};
