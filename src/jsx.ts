/** `h` function for JSX
 * ## Usage
 * ```tsx
 * /​** @jsx h *​/
 * import { h } from "router";
 *
 * function Component(props, ...children) {
 *      return <h1>Hello World</h1>
 *  }
 * ```
 */
export function h(
  type: string | Function,
  props: Record<string, any> | null,
  ...children: string[]
): VNode {
  return { type, props, children };
}

/** Node type for JSX */
export type VNode = {
  type: string | Function;
  props: Record<string, any> | null;
  children: Array<string | VNode>;
};

/**
 * Renders a node from JSX to a string
 *
 * ## Usage
 * ```tsx
 * /​** @jsx h *​/
 * import { h, render } from "router";
 *
 * console.log(render(<h1>Hello World</h1>))
 * // "<h1>Hello World</h1>"
 * ```
 */
export function renderToString({ type, props, children }: VNode): string {
  if (typeof type === "function") {
    return renderToString(type(props, children));
  }
  let attributes = "";

  if (props) {
    attributes += " ";
    Object.keys(props).forEach((key) => {
      attributes += `key="${props[key]}"`;
    });
  }

  let body: string = "";
  if (children && children.length) {
    body = children
      .map((v) => {
        if (typeof v === "string") return v;
        return renderToString(v);
      })
      .join("\n");
  }

  return `<${type}${attributes}>${body}</${type}>`;
}

export function render(node: VNode, options: ResponseInit = {}): Response {
  return new Response(
    renderToString(node),
    Object.assign(
      {
        headers: { "content-type": "text/html" },
      },
      options,
    ),
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends OptionalParams<HTMLElementTagNameMap> {}
  }
}

type OptionalParams<
  T extends Record<string, any>,
  K extends keyof T = keyof T,
> = Record<K, Partial<T[K]>>;
