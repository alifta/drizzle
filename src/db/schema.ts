import { table } from 'console';
import { primaryKey } from 'drizzle-orm/mysql-core';
import {
  pgTable,
  serial,
  uuid,
  varchar,
  integer,
  pgEnum,
  uniqueIndex,
  boolean,
  real,
  timestamp,
} from 'drizzle-orm/pg-core';

export const UserRole = pgEnum('userRole', ['ADMIN', 'BASIC']);

export const UserTable = pgTable(
  'user',
  {
    // id: serial('id').primaryKey().notNull(),
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    age: integer('age').notNull(),
    role: UserRole('userRole').default('BASIC').notNull(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex('emailIndex').on(table.email),
      uniqueNameAndAge: uniqueIndex('uniqueNameAndAge').on(
        table.name,
        table.age,
      ),
    };
  },
);

export const userPreferenceTable = pgTable('userPreference', {
  id: uuid('id').primaryKey().defaultRandom(),
  emailUpdates: boolean('emailUpdates').notNull(),
  userId: uuid('userId')
    .references(() => UserTable.id)
    .notNull(),
});

export const postTable = pgTable('post', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  averageRating: real('averageRating').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  content: varchar('content', { length: 255 }).notNull(),
  authorId: uuid('authorId')
    .references(() => UserTable.id)
    .notNull(),
});

export const categoryTable = pgTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
});

export const postCategoryTable = pgTable(
  'postCategory',
  {
    postId: uuid('postId')
      .references(() => postTable.id)
      .notNull(),
    categoryId: uuid('categoryId')
      .references(() => categoryTable.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    };
  },
);
