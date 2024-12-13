export type Author = {
  id: number; // Represents the 'ID' column (NUMBER)
  name: string; // Represents the 'NAME' column (VARCHAR2(50))
  dob?: Date; // Represents the 'DOB' column (DATE), optional
  createdBy?: string; // Represents the 'CREATED_BY' column (VARCHAR2(50)), optional
  updatedBy?: string; // Represents the 'UPDATED_BY' column (VARCHAR2(50)), optional
  createdAt?: Date; // Represents the 'CREATED_AT' column (DATE), optional
  updatedAt?: Date; // Represents the 'UPDATED_AT' column (DATE), optional
};
