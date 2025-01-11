import { Kysely, sql } from 'kysely';

export default {
  async up(db: Kysely<unknown>) {
    await db.schema
      .alterTable('post_count')
      .dropColumn('created')
      .dropColumn('deleted')
      .dropColumn('count')
      .addColumn('total', 'bigint', (col) => col.notNull().defaultTo(0))
      .addColumn('created_image', 'bigint', (col) => col.notNull().defaultTo(0))
      .addColumn('created_no_image', 'bigint', (col) => col.notNull().defaultTo(0))
      .addColumn('deleted_user', 'bigint', (col) => col.notNull().defaultTo(0))
      .addColumn('deleted_feed_generator', 'bigint', (col) => col.notNull().defaultTo(0))
      .execute();

    // Add updated trigger function
    await sql`
        CREATE OR REPLACE FUNCTION update_post_count() RETURNS TRIGGER AS
        $$
        BEGIN
            IF TG_OP = 'INSERT' THEN
                UPDATE post_count SET total = total + 1;
                IF NEW.has_image THEN
                    UPDATE post_count SET created_image = created_image + 1;
                ELSE
                    UPDATE post_count SET created_no_image = created_no_image + 1;
                END IF;
            ELSIF TG_OP = 'DELETE' THEN
                UPDATE post_count SET total = total - 1;
                IF OLD."indexedAt" <= (EXTRACT(EPOCH FROM NOW()) * 1000 - 172800000) THEN
                    -- Post is older than two days, consider it a feed generator delete
                    UPDATE post_count SET deleted_feed_generator = deleted_feed_generator + 1;
                ELSE
                    -- Post is not older than two days, consider it a user delete
                    UPDATE post_count SET deleted_user = deleted_user + 1;
                END IF;
            END IF;
            RETURN NULL;
        END;
        $$ LANGUAGE plpgsql;
    `.execute(db);
  },
  async down(db: Kysely<unknown>) {
    await db.schema
      .alterTable('post_count')
      .addColumn('created', 'bigint', (col) => col.notNull().defaultTo(0))
      .addColumn('deleted', 'bigint', (col) => col.notNull().defaultTo(0))
      .addColumn('count', 'bigint', (col) => col.notNull().defaultTo(0))
      .dropColumn('created_image')
      .dropColumn('created_no_image')
      .dropColumn('deleted_user')
      .dropColumn('deleted_feed_generator')
      .dropColumn('total')
      .execute();

    // Replace with old trigger function
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
};
