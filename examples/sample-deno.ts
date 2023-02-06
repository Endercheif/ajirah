import { serve } from "https://deno.land/std@0.176.0/http/mod.ts";

import { Router } from "../mod.ts";

const router = Router<Response>();

router.route({ pathname: "/account/:id" }, ({ result }) => {
  return new Response(`account id is ${result.pathname.groups.id}`);
});

router.route({ pathname: "/" }, ({ req }) => {
  console.log(req);
  return new Response("main page");
});

serve((req) => {
  return router.match(req) || new Response("Page not found", { status: 404 });
});
