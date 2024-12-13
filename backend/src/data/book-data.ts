import { z } from "zod";
import { SQL_QUERY } from "../constants/sql-query";
import { bookData, IncomingData } from "../schema/book-schema";
import { executeQuery } from "../utils/helper";
import oracledb from "oracledb";

const getMany = async () => {
  const result = await executeQuery<z.infer<typeof bookData>>(
    SQL_QUERY.BOOK.GET_MANY
  );
  return result.rows;
};
const getOne = async (id: string) => {
  const result = await executeQuery<z.infer<typeof bookData>>(
    SQL_QUERY.BOOK.GET_ONE,
    [id]
  );
  return result.rows;
};

const deleteOne = async (id: string) => {
  const result = await executeQuery<z.infer<typeof bookData>>(
    SQL_QUERY.BOOK.DELETE,
    [id]
  );
  return result.rowsAffected;
};

const createOne = async (data: IncomingData) => {
  let connection;
  try {
    // Establish the database connection
    connection = await oracledb.getConnection();
    // Execute the PL/SQL block
    const result: any = await connection.execute(
      SQL_QUERY.BOOK.CREATE_BOOK_AND_AUTHOR, // Use the PL/SQL block
      {
        title: { val: data.title },
        author: { val: data.author },
        publishedYear: { val: new Date(data.publishedYear) },
        dob: { val: new Date(data.dob) },
        createdBy: { val: "admin" },
        updatedBy: { val: "admin" },
        insertedBookId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, // Outbind for book ID
        insertedAuthorId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, // Outbind for author ID
      },
      { autoCommit: false } // Disable auto-commit since we're managing it
    );

    // Access the outbinds for inserted book ID and author ID
    console.log("result", result);
    const insertedBookId = result.outBinds.insertedBookId[0];
    const insertedAuthorId = result.outBinds.insertedAuthorId[0];

    console.log("Inserted Book ID:", insertedBookId);
    console.log("Inserted Author ID:", insertedAuthorId);

    // Commit the transaction
    await connection.commit();
    console.log("Transaction committed");

    return { insertedBookId, insertedAuthorId };
  } catch (error) {
    console.error("Error in transaction:", error);

    // Rollback the transaction in case of error
    if (connection) {
      try {
        await connection.rollback();
        console.log("Transaction rolled back due to error");
      } catch (rollbackError) {
        console.error("Error during rollback:", rollbackError);
      }
    }
    throw error; // Re-throw the error for further handling
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Connection closed");
      } catch (closeError) {
        console.error("Error closing connection:", closeError);
      }
    }
  }
};

const createBookAndAuthor = async (data: IncomingData) => {
  let connection;
  try {
    connection = await oracledb.getConnection();

    const result:any = await connection.execute(
      SQL_QUERY.BOOK.CREATE_BOOK_AND_AUTHOR,
      {
        title: data.title,
        author: data.author,
        publishedYear: data.publishedYear,
        dob: data.dob,
        createdBy: "admin",
        updatedBy: "admin",
        insertedBookId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, 
        insertedAuthorId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, 
      },
      { autoCommit: false }
    );

    // Commit the transaction if everything is successful
    await connection.commit();
    console.log("Transaction committed successfully");

    const insertedBookId = result.outBinds.insertedBookId;
    const insertedAuthorId = result.outBinds.insertedAuthorId;

    console.log("Inserted Book ID:", insertedBookId);
    console.log("Inserted Author ID:", insertedAuthorId);

    return { insertedBookId, insertedAuthorId };
  } catch (error) {
    console.error("Error in transaction:", error);

    // Rollback the transaction if an error occurs
    if (connection) {
      try {
        await connection.rollback();
        console.log("Transaction rolled back due to error");
      } catch (rollbackError) {
        console.error("Error during rollback:", rollbackError);
      }
    }
    throw error; // Re-throw the error for further handling
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Connection closed");
      } catch (closeError) {
        console.error("Error closing connection:", closeError);
      }
    }
  }
};

const updateOne = async (id: string, data: IncomingData) => {
  const result = await executeQuery<z.infer<typeof bookData>>(
    SQL_QUERY.BOOK.UPDATE,
    {
      title: { val: data.title },
      author: { val: data.author },
      publishedYear: { val: new Date(data.publishedYear) },
      createdBy: { val: "admin" },
      updatedBy: { val: "admin" },
      id: { val: id },
    }
  );
  console.log("result", result);
  return { result };
};

export default {
  getMany,
  getOne,
  deleteOne,
  createOne,
  updateOne,
  createBookAndAuthor,
} as const;
