/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { hasProp, isObj } from '../../../../util';
import * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef';

export interface Record {
  subject: ComAtprotoRepoStrongRef.Main;
  createdAt: string;

  [k: string]: unknown;
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'app.bsky.feed.like#main' || v.$type === 'app.bsky.feed.like')
  );
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('app.bsky.feed.like#main', v);
}
