/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { hasProp, isObj } from '../../../../util';

export interface Record {
  subject: string;
  createdAt: string;

  [k: string]: unknown;
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'app.bsky.graph.follow#main' ||
      v.$type === 'app.bsky.graph.follow')
  );
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('app.bsky.graph.follow#main', v);
}
