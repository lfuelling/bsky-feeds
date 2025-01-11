import { Kysely } from 'kysely';

export default {
  async up(db: Kysely<unknown>) {
    await db.schema
      .alterTable('post')
      .alterColumn('indexedAt', col => col.setNotNull())
      .alterColumn('cid', col => col.setNotNull())
      .alterColumn('uri', col => col.setNotNull())
      .addColumn('has_image', 'boolean',  col => col.notNull().defaultTo(false))
      .addColumn('lang', 'varchar',  col => col.defaultTo(null))
      .execute();
  },
  async down(db: Kysely<unknown>) {
    await db.schema
      .alterTable('post')
      .dropColumn('lang')
      .dropColumn('has_image')
      .alterColumn('indexedAt', col => col.dropNotNull())
      .alterColumn('cid', col => col.dropNotNull())
      .alterColumn('uri', col => col.dropNotNull())
      .execute();
  },
};
