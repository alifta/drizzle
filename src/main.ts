import 'dotenv/config';
import { db } from './db/db';
import { UserTable } from './db/schema';

async function main() {
  console.log('Hello World!');

  await db.delete(UserTable);

  const user = await db
    .insert(UserTable)
    .values([
      { email: 'ali@example.com', name: 'ali', age: 30 },
      { email: 'sally@example.com', name: 'sally', age: 31 },
    ])
    .returning({
      id: UserTable.id,
      userName: UserTable.name,
    })
    .onConflictDoUpdate({
      target: UserTable.email,
      set: { name: 'Updated Name' },
    });

  console.log(user);
}

main();
