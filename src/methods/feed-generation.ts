import { InvalidRequestError } from '@atproto/xrpc-server';
import { Server } from '../lexicon';
import { AppContext } from '../AppContext';
import { algos } from '../algos';
import { AtUri } from '@atproto/syntax';

export default function(server: Server, ctx: AppContext) {
  server.app.bsky.feed.getFeedSkeleton(async ({ params, req }) => {
    const feedUri = new AtUri(params.feed);
    const algo = algos[feedUri.rkey];
    if (
      feedUri.hostname !== ctx.cfg.publisherDid ||
      feedUri.collection !== 'app.bsky.feed.generator' ||
      !algo
    ) {
      throw new InvalidRequestError(
        'Unsupported algorithm',
        'UnsupportedAlgorithm',
      );
    }

    let langs = req.header('accept-language')?.split(',') ?? [];

    const body = await algo(ctx, params, langs);
    return {
      encoding: 'application/json',
      body: body,
    };
  });
}
