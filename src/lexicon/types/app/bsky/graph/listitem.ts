/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { hasProp, isObj } from '../../../../util';

export interface Record {
  subject: string;
  list: string;
  createdAt: string;

  [k: string]: unknown;
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'app.bsky.graph.listitem#main' ||
      v.$type === 'app.bsky.graph.listitem')
  );
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('app.bsky.graph.listitem#main', v);
}
