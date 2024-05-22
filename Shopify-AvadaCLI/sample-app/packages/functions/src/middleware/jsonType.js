/**
 * Middle for checking if content type is json
 *
 * @param ctx
 * @param next
 * @returns {Promise<*>}
 */
export default async function jsonType(ctx, next) {
  const jsonTypes = [
    'application/json',
    'application/json-patch+json',
    'application/vnd.api+json',
    'application/csp-report'
  ];
  if (ctx.request.is(jsonTypes)) return await next();

  throw new Error('Not allowed content type');
}
