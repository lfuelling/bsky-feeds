/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { hasProp, isObj } from '../../../../util';

export interface Main {
  uri: string;
  cid: string;

  [k: string]: unknown;
}

export function isMain(v: unknown): v is Main {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'com.atproto.repo.strongRef#main' ||
      v.$type === 'com.atproto.repo.strongRef')
  );
}

export function validateMain(v: unknown): ValidationResult {
  return lexicons.validate('com.atproto.repo.strongRef#main', v);
}
