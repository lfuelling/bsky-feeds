import { Kysely, sql } from 'kysely';

export default {
  async up(db: Kysely<unknown>) {
    // the sub_state table
    await db.schema
      .createTable('sub_state')
      .addColumn('service', 'varchar', (col) => col.primaryKey())
      .addColumn('cursor', 'bigint', (col) => col.notNull())
      .execute();

    // the post table
    await db.schema
      .createTable('post')
      .addColumn('uri', 'varchar', (col) => col.primaryKey())
      .addColumn('cid', 'varchar', (col) => col.notNull())
      .addColumn('indexedAt', 'bigint', (col) => col.notNull())
      .execute();

    // index on post.indexedAt
    await db.schema
      .createIndex('post_indexedAt_index')
      .on('post')
      .column('indexedAt')
      .execute();

    // table for post_count
    await db.schema
      .createTable('post_count')
      .addColumn('count', 'bigint', (col) => col.notNull().defaultTo(0))
      .execute();

    // insert count item
    await sql`INSERT INTO post_count DEFAULT
              VALUES;`.execute(db);

    // Create trigger function
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

    // Create trigger
    await sql`
        CREATE TRIGGER post_count_trigger
            AFTER INSERT OR DELETE
            ON post
            FOR EACH ROW
        EXECUTE FUNCTION update_post_count();
    `.execute(db);
  },
  async down(db: Kysely<unknown>) {
    await sql`DROP TRIGGER IF EXISTS post_count_trigger ON post;`.execute(db);
    await sql`DROP FUNCTION IF EXISTS update_post_count;`.execute(db);
    await db.schema.dropIndex('post_indexedAt_index').execute();
    await db.schema.dropTable('post_count').execute();
    await db.schema.dropTable('sub_state').execute();
    await db.schema.dropTable('post').execute();
  },
};