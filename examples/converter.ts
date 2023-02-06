import { serve } from "https://deno.land/std@0.176.0/http/mod.ts";

import { Router } from "../mod.ts";

interface StringableObject {
  [index: string]: StringableObject | string | number;
}

const router = Router<string | number | StringableObject | Response>();

router.route({ pathname: "/user/:id" }, ({ result }) => {
  return { id: +result.pathname.groups.id };
});

router.route({ pathname: "/" }, () => {
  return "main page";
});

function convert(o: string | number | StringableObject | Response) {
  if (o instanceof Response) return o;
  else if (typeof o === "object") {
    return new Response(JSON.stringify(o), {
      headers: { "content-type": "application/json" },
    });
  } else return new Response(`${o}`);
}

serve((req) => {
  let res;
  if ((res = router.match(req))) {
    return convert(res);
  }
  return new Response("Page not found", { status: 404 });
});
