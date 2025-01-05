/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { BlobRef, ValidationResult } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { hasProp, isObj } from '../../../../util';
import * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs';

export interface Record {
  displayName?: string;
  description?: string;
  avatar?: BlobRef;
  banner?: BlobRef;
  labels?:
    | ComAtprotoLabelDefs.SelfLabels
    | { $type: string; [k: string]: unknown };

  [k: string]: unknown;
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'app.bsky.actor.profile#main' ||
      v.$type === 'app.bsky.actor.profile')
  );
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('app.bsky.actor.profile#main', v);
}
