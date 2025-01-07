import express from 'express';
import { AppContext } from '../AppContext';

const makeRouter = (ctx: AppContext) => {
  const router = express.Router();

  router.get('/metrics', async (_req, res) => {
    return await ctx.db
      .selectFrom('post_count')
      .selectAll()
      .executeTakeFirst()
      .then(postCount => {
        if (postCount !== undefined) {
          res.contentType('text/plain; version=0.0.4');
          return res.send('# HELP feeds_posts_total Total number of posts currently saved.\n' +
            '# TYPE feeds_posts_total gauge\n' +
            `feeds_posts_total ${(postCount.count)}\n` +
            '# HELP feeds_posts_deleted Number of deleted posts.\n' +
            '# TYPE feeds_posts_deleted gauge\n' +
            `feeds_posts_deleted ${(postCount.deleted)}\n` +
            '# HELP feeds_posts_created Number of created posts.\n' +
            '# TYPE feeds_posts_created gauge\n' +
            `feeds_posts_created ${(postCount.created)}\n`);
        } else {
          return res.sendStatus(500);
        }
      }).catch(e => {
        return res.sendStatus(500);
      });
  });

  return router;
};

export default makeRouter;
