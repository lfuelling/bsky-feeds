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
            `feeds_posts_total ${(postCount.total)}\n` +
            '# HELP feeds_posts_deleted Number of deleted posts.\n' +
            '# TYPE feeds_posts_deleted gauge\n' +
            `feeds_posts_deleted{reason="user"} ${(postCount.deleted_user)}\n` +
            `feeds_posts_deleted{reason="feed_generator"} ${(postCount.deleted_feed_generator)}\n` +
            '# HELP feeds_posts_created Number of created posts.\n' +
            '# TYPE feeds_posts_created gauge\n' +
            `feeds_posts_created{has_image="true"} ${(postCount.created_image)}\n` +
            `feeds_posts_created{has_image="false"} ${(postCount.created_no_image)}\n`);
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
