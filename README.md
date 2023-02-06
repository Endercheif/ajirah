# ajirah
*ajirah - a simple http router that keeps on going*
_Built on Request/Response and URLPattern_

(works on Deno and Bun)

## Usage

**See more in /examples**

```ts
// strict url matching

import { serve } from "https://deno.land/std@0.176.0/http/mod.ts";
import { Router } from "ajirah";

const router = new Router(["/", () => new Response("Hello World!")]);

// or add new routes like this
router.route("/help", () => {
  return new Response("help page");
});

serve((req) => {
  return (
    router.match(req) || new Response("Page not found", { status: 404 })
  );
});
```

```ts
// pattern matching

import { serve } from "https://deno.land/std@0.176.0/http/mod.ts";
import { Router } from "ajirah";

const router = new Router();


router.route({pathname: "/user/:id"}, ({result}) => {
  return new Response(`id: ${result.pathname.groups.id}`);
});

serve((req) => {
  return (
    router.match(req) || new Response("Page not found", { status: 404 })
  );
});
```

```tsx
// using JSX

import { serve } from "https://deno.land/std@0.176.0/http/mod.ts";
import { Router, render } from "ajirah";

const router = new Router(["/", () => render(<h1>Hello World</h1>)]);

serve(req) => {
    return router.match(req) || render(<p>Page not found</p>, {status:404});
};
```
