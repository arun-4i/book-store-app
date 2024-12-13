
export const SQL_QUERY = {
  BOOK: {
    GET_MANY: "SELECT * FROM FSF_1618_BOOKS",
    GET_ONE: "SELECT * FROM FSF_1618_BOOKS WHERE ID = :id",
    DELETE: "DELETE FROM FSF_1618_BOOKS WHERE ID = :id",

    CREATE_BOOK: `
      INSERT INTO FSF_1618_BOOKS (
        BOOK_ID, TITLE, AUTHOR, PUBLISHEDYEAR, CREATED_BY, UPDATED_BY, CREATED_AT, UPDATED_AT
      ) VALUES (
        FSF_1618_BOOKS_SEQ.NEXTVAL, :title, :author, :publishedYear, :createdBy, :updatedBy, SYSDATE, SYSDATE
      )RETURNING ID INTO :insertedBOOK_ID`,

    GET_AUTHOR_FROM_BOOKS: `SELECT AUTHOR FROM FSF_1618_BOOKS WHERE ID = :id`,

    UPDATE_AUTHOR_ID: `UPDATE FSF_1618_BOOKS
      SET AUTHOR_ID = :insertedAuthorId
      WHERE BOOK_ID = :insertedBookId`,

    UPDATE: `UPDATE FSF_1618_BOOKS 
      SET
      TITLE = :title,
      AUTHOR = :author,
      PUBLISHEDYEAR =:publishedYear,
      CREATED_BY = :createdBy,
      UPDATED_BY = :updatedBy,
      UPDATED_AT = SYSDATE
      WHERE ID = :id`,
    // PL/SQL block for creating a book and author, and updating the book with the new author's ID
    CREATE_BOOK_AND_AUTHOR: `
     DECLARE
  insertedBookId NUMBER;
  insertedAuthorId NUMBER;
BEGIN
  -- Step 1: Insert book details
  INSERT INTO FSF_1618_BOOKS (
    BOOK_ID, TITLE, AUTHOR, PUBLISHEDYEAR, CREATED_BY, UPDATED_BY, CREATED_AT, UPDATED_AT
  ) 
  VALUES (
    FSF_1618_BOOKS_SEQ.NEXTVAL, 
    :title, 
    :author, 
    TO_DATE(:publishedYear, 'YYYY-MM-DD'), 
    :createdBy, 
    :updatedBy, 
    SYSDATE, 
    SYSDATE
  ) 
  RETURNING BOOK_ID INTO :insertedBookId;  

  -- Step 2: Insert author using the new book's data
  INSERT INTO FSF_1618_AUTHORS (
    AUTHOR_ID, NAME, DOB, CREATED_BY, UPDATED_BY, CREATED_AT, UPDATED_AT
  ) 
  VALUES (
    FSF_1618_AUTHORS_SEQ.NEXTVAL, 
    :author, 
    TO_DATE(:dob, 'YYYY-MM-DD'), 
    :createdBy, 
    :updatedBy, 
    SYSDATE, 
    SYSDATE
  ) 
  RETURNING AUTHOR_ID INTO :insertedAuthorId; 

  -- Step 3: Update the book record with the new AUTHORID
  UPDATE FSF_1618_BOOKS
  SET AUTHOR_ID = :insertedAuthorId  -- Use the bound variable for AUTHOR_ID
  WHERE BOOK_ID = : ;  -- Use the bound variable for BOOK_ID
END;`,
  },
  AUTHOR: {
    CREATE_AUTHOR: `INSERT INTO FSF_1618_AUTHORS (AUTHORID, NAME, DOB, CREATED_BY, UPDATED_BY, CREATED_AT, UPDATED_AT)
VALUES (FSF_1618_AUTHORS_SEQ.NEXTVAL, :author, :dob, :createdBy, :updatedBy, SYSDATE, SYSDATE)
RETURNING AUTHOR_ID INTO :insertedAuthorId`,
  },
} as const;
