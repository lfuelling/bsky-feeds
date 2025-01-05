import express from 'express';
import { AppContext } from '../config';

const makeRouter = (ctx: AppContext) => {
  const router = express.Router();

  router.get('/metrics', async (_req, res) => {
    return await ctx.db
      .selectFrom('post')
      .select((eb) => eb.fn.countAll().as('num_posts'))
      .executeTakeFirst()
      .then(totalPosts => {
        if (totalPosts !== undefined) {
          res.contentType('text/plain; version=0.0.4');
          return res.send('# HELP feeds_posts_total Total number of posts.\n' +
            '# TYPE feeds_posts_total gauge\n' +
            `feeds_posts_total ${(totalPosts.num_posts)}`);
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
