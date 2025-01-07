import { QueryParams } from '../lexicon/types/app/bsky/feed/getFeedSkeleton';
import { AppContext } from '../AppContext';

export const shortname = 'new_posts';

export const handler = async (ctx: AppContext, params: QueryParams) => {
  let builder = ctx.db
    .selectFrom('post')
    .selectAll()
    .orderBy('indexedAt', 'desc')
    .orderBy('cid', 'desc')
    .limit(params.limit);

  if (params.cursor) {
    builder = builder.where('post.indexedAt', '<', new Date(parseInt(params.cursor, 10)).getTime());
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
