import { AppContext } from '../AppContext';
import { OutputSchema as AlgoOutput, QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton';
import { DatabaseSchema, Post } from '../db/schema';
import { SelectQueryBuilder } from 'kysely';

type AlgoHandler = (ctx: AppContext, params: QueryParams, langs: string[]) => Promise<AlgoOutput>;

const baseAlgo = async (builder: SelectQueryBuilder<DatabaseSchema, 'post', Post>, params: QueryParams, langs: string[]) => {
  // filter by languages if needed
  if (langs.length > 0) {
    builder = builder.where('lang', 'in', langs);
  }

  // filter by cursor if needed
  if (params.cursor) {
    builder = builder.where('post.indexedAt', '<', new Date(Number(params.cursor)).getTime());
  }

  // fetch posts
  const res = await builder.execute();

  // render feed
  const feed = res.map((row) => ({
    post: row.uri,
  }));

  // generate cursor
  let cursor: string | undefined;
  const last = res.at(-1);
  if (last) {
    cursor = `${new Date(Number(last.indexedAt)).getTime()}`;
  }

  return {
    cursor,
    feed,
  };
};

export const algos: Record<string, AlgoHandler> = {
  // new posts algo
  ['new_posts']: (ctx: AppContext, params: QueryParams, langs: string[]) =>
    baseAlgo(ctx.db
      .selectFrom('post')
      .selectAll()
      .orderBy('indexedAt', 'desc')
      .orderBy('cid', 'desc')
      .limit(params.limit), params, langs),

  // with image algo
  ['with_image']: (ctx: AppContext, params: QueryParams, langs: string[]) => baseAlgo(ctx.db
    .selectFrom('post')
    .selectAll()
    .where('has_image', '=', true)
    .orderBy('indexedAt', 'desc')
    .orderBy('cid', 'desc')
    .limit(params.limit), params, langs),

  // no image algo
  ['no_image']: (ctx: AppContext, params: QueryParams, langs: string[]) => baseAlgo(ctx.db
    .selectFrom('post')
    .selectAll()
    .where('has_image', '=', false)
    .orderBy('indexedAt', 'desc')
    .orderBy('cid', 'desc')
    .limit(params.limit), params, langs),
};
