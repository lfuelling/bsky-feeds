/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { BlobRef, ValidationResult } from '@atproto/lexicon';
import { lexicons } from '../../../../lexicons';
import { hasProp, isObj } from '../../../../util';
import * as AppBskyRichtextFacet from '../richtext/facet';
import * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs';

export interface Record {
  did: string;
  displayName: string;
  description?: string;
  descriptionFacets?: AppBskyRichtextFacet.Main[];
  avatar?: BlobRef;
  labels?:
    | ComAtprotoLabelDefs.SelfLabels
    | { $type: string; [k: string]: unknown };
  createdAt: string;

  [k: string]: unknown;
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'app.bsky.feed.generator#main' ||
      v.$type === 'app.bsky.feed.generator')
  );
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('app.bsky.feed.generator#main', v);
}
