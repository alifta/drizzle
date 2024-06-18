import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// Migrations
const migrationClient = postgres(process.env.POSTGRES_URL as string, {
  max: 1,
});

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: './src/db/migrations',
  });

  await migrationClient.end();
}

main();
