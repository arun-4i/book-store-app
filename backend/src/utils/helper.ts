import type { BindParameters, Connection } from "oracledb";
import { connectionPool } from "../config/db-config";

export const executeQuery = async <T>(
  sql: string,
  bindParams?: BindParameters
) => {
  let connection: Connection | undefined;

  try {
    connection = await connectionPool.getConnection();
    return await connection.execute<T>(sql, bindParams || []);
  } catch (err) {
    connection?.rollback();
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        throw err;
      }
    }
  }
};
