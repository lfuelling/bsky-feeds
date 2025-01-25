import { isCommit, OutputSchema as RepoEvent } from './lexicon/types/com/atproto/sync/subscribeRepos';
import { getOpsByType } from './util/getOpsByType';
import { FirehoseSubscriptionBase } from './FirehostSubscriptionBase';
import { sql } from 'kysely';
import { Post } from './db/schema';

export class FirehoseSubscription extends FirehoseSubscriptionBase {
  async handleEvent(evt: RepoEvent) {
    if (!isCommit(evt)) return;

    const ops = await getOpsByType(evt);

    const postsToDelete = ops.posts.deletes.map((del) => del.uri);
    const postsToCreate = ops.posts.creates
      .map((create) => {
        return {
          uri: create.uri,
          cid: create.cid,
          indexedAt: new Date().getTime(),
          has_image: create.record.embed?.$type === "app.bsky.embed.images",
          lang: (create.record.langs ?? [])[0] ?? null
        } as Post;
      });

    if (postsToDelete.length > 0) {
      await this.db
        .deleteFrom('post')
        .where('uri', 'in', postsToDelete)
        .execute();
    }

    if (postsToCreate.length > 0) {
      await this.db
        .insertInto('post')
        .values(postsToCreate)
        .onConflict((oc) => oc.doNothing())
        .execute();
    }

    // delete max 10 posts older than 48h, this causes lots of lag and I have yet to find a better solution.
    /*await sql`WITH rows_to_delete AS (
        SELECT uri
        FROM post
        WHERE post."indexedAt" <= ${new Date().getTime() - 172800000}
        LIMIT 10
    )
        DELETE FROM post
        WHERE uri IN (SELECT uri FROM rows_to_delete);`.execute(this.db);*/
  }
}
