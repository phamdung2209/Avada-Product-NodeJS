/**
 * Create a new middleware to handle catch all errors
 *
 * @return {Function}
 */
export default function createErrorHandler() {
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      if (ctx.get('accept') === 'application/json') {
        ctx.status = err.status || 500;
        if (err.errors) {
          ctx.body = {errors: err.errors};
        } else {
          ctx.body = {error: err.message};
        }
      } else {
        await ctx.render('error', {error: err.message});
      }
      ctx.app.emit('error', err, ctx);
    }
  };
}
