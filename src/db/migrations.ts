import { Migration, MigrationProvider } from 'kysely';
import migration001 from './migrations/001';
import migration002 from './migrations/002';

const migrations: Record<string, Migration> = {};

migrations['001'] = migration001;
migrations['002'] = migration002;

export const migrationProvider: MigrationProvider = {
  async getMigrations() {
    return migrations;
  },
};
