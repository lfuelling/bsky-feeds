import { AppContext } from '../AppContext';
import { OutputSchema as AlgoOutput, QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton';
import * as new_posts from './new_posts';
import * as with_image from './with_image';
import * as no_image from './no_image';

type AlgoHandler = (ctx: AppContext, params: QueryParams) => Promise<AlgoOutput>;

const algos: Record<string, AlgoHandler> = {
  [new_posts.shortname]: new_posts.handler,
  [with_image.shortname]: with_image.handler,
  [no_image.shortname]: no_image.handler,
};

export default algos;
