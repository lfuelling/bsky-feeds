import { Migration, MigrationProvider } from 'kysely';
import migration001 from './migrations/001';
import migration002 from './migrations/002';
import migration003 from './migrations/003';

const migrations: Record<string, Migration> = {};

migrations['001'] = migration001;
migrations['002'] = migration002;
migrations['003'] = migration003;

export const migrationProvider: MigrationProvider = {
  async getMigrations() {
    return migrations;
  },
};
