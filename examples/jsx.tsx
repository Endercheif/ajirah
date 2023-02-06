/** @jsx h */
import { serve } from "https://deno.land/std@0.176.0/http/mod.ts";

import { Router, h, render, type VNode } from "../mod.ts";

function Doc(props: { title: string }, children: Array<VNode | string>) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
      </head>
      <body>{...children}</body>
    </html>
  );
}

const router = Router<Response>();

router.route({ pathname: "/" }, () => {
  return render(
    <Doc title="Home">
      <h1>Hello World!</h1>
    </Doc>,
  );
});

serve((req) => {
  return (
    router.match(req) ||
    render(
      <Doc title={`Not Found | ${new URL(req.url).pathname.slice(1)}`}>
        Page not found.
      </Doc>,
      { status: 404 },
    )
  );
});
