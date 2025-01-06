import { AppContext } from '../config';
import { OutputSchema as AlgoOutput, QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton';
import * as new_posts from './new_posts';

type AlgoHandler = (ctx: AppContext, params: QueryParams) => Promise<AlgoOutput>;

const algos: Record<string, AlgoHandler> = {
  [new_posts.shortname]: new_posts.handler,
};

export default algos;
