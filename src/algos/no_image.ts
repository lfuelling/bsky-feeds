import { QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton';
import { AppContext } from '../AppContext';

export const shortname = 'no_image';

export const handler = async (ctx: AppContext, params: QueryParams) => {
  let builder = ctx.db
    .selectFrom('post')
    .selectAll()
    .where('has_image', '=', false)
    .orderBy('indexedAt', 'desc')
    .orderBy('cid', 'desc')
    .limit(params.limit);

  if (params.cursor) {
    builder = builder.where('post.indexedAt', '<', new Date(Number(params.cursor)).getTime());
  }
  const res = await builder.execute();

  const feed = res.map((row) => ({
    post: row.uri,
  }));

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
