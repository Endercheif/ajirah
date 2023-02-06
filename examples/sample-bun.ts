// run `bun install urlpattern-polyfill` before running this

import { Router } from "../mod.ts";
import "urlpattern-polyfill";

const router = Router<Response>();

router.route({ pathname: "/account/:id" }, ({ result }) => {
  return new Response(`account id is ${result.pathname.groups.id}`);
});

router.route({ pathname: "/" }, ({ req }) => {
  console.log(req);
  return new Response("main page");
});

export default {
  port: 8000,
  fetch(req: Request) {
    return router.match(req) || new Response("Page not found", { status: 404 });
  },
};
