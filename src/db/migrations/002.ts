import { Kysely, sql } from 'kysely';

export default {
  async up(db: Kysely<unknown>) {
    await db.schema
      .alterTable('post_count')
      .addColumn('deleted', 'bigint', (col) => col.notNull().defaultTo(0))
      .addColumn('created', 'bigint', (col) => col.notNull().defaultTo(0))
      .execute();

    // Add new trigger function
    await sql`
        CREATE OR REPLACE FUNCTION update_post_count() RETURNS TRIGGER AS
        $$
        BEGIN
            IF TG_OP = 'INSERT' THEN
                UPDATE post_count SET count = count + 1;
                UPDATE post_count SET created = created + 1;
            ELSIF TG_OP = 'DELETE' THEN
                UPDATE post_count SET count = count - 1;
                UPDATE post_count SET deleted = deleted + 1;
            END IF;
            RETURN NULL;
        END;
        $$ LANGUAGE plpgsql;
    `.execute(db);
  },
  async down(db: Kysely<unknown>) {
    await db.schema
      .alterTable('post_count')
      .dropColumn('deleted')
      .execute();

    await db.schema
      .alterTable('post_count')
      .dropColumn('created')
      .execute();

    // Replace with old trigger function
    await sql`
        CREATE OR REPLACE FUNCTION update_post_count() RETURNS TRIGGER AS
        $$
        BEGIN
            IF TG_OP = 'INSERT' THEN
                UPDATE post_count SET count = count + 1;
            ELSIF TG_OP = 'DELETE' THEN
                UPDATE post_count SET count = count - 1;
            END IF;
            RETURN NULL;
        END;
        $$ LANGUAGE plpgsql;
    `.execute(db);
  },
};
