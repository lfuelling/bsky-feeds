import { Database } from './db';
import { DidResolver } from '@atproto/identity';
import { Config } from './Config';

export type AppContext = {
  db: Database
  didResolver: DidResolver
  cfg: Config
}
