import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  context.locals.appVersion = "0.3.1";

  return next();
});
