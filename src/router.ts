export type Handler<RType> = ({
  req,
  result,
}: {
  req: Request;
  result: URLPatternResult;
}) => RType;

export function Router<RType = unknown>(
  handlers: Array<[URLPatternInput, Handler<RType>]> = [],
) {
  const routes: Array<[URLPattern, Handler<RType>]> = handlers.map((
    [pattern, handler],
  ) => [
    new URLPattern(pattern),
    handler,
  ]);
  return {
    match(req: Request) {
      for (const [pattern, handler] of routes) {
        const result = pattern.exec(req.url);
        if (result) return handler.call(handler, { req, result });
      }
    },
    route(pattern: URLPatternInput, handler: Handler<RType>): void {
      routes.push([new URLPattern(pattern), handler]);
    },
  };
}
