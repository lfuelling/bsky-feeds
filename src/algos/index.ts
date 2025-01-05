import { AppContext } from '../config';
import { OutputSchema as AlgoOutput, QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton';
import * as newposts from './newposts';

type AlgoHandler = (ctx: AppContext, params: QueryParams) => Promise<AlgoOutput>;

const algos: Record<string, AlgoHandler> = {
  [newposts.shortname]: newposts.handler,
};

export default algos;
