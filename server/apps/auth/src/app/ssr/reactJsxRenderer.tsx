// react-view-engine.ts
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App, AppProps } from '@wr/oauth-view';
import { StaticRouter } from 'react-router-dom';

// A basic function matching the signature for an Express view engine
export function reactViewEngine(
  filePath: string,
  options: Record<string, any>,
  callback: (err?: Error, html?: string) => void,
) {
  try {
    // 1) Dynamically import your React App or a specific component
    //    Some folks simply require() or import() the filePath
    //    But if you have a known single entry, you can do so directly.

    // Example: if filePath => '/path/to/SomePage.jsx'
    //  const Component = require(filePath).default; // or .SomePage

    const props: AppProps = options?.props || {};

    // 2) Render
    const html = renderToString(
      <StaticRouter location={filePath}>
        <App {...props} />
      </StaticRouter>,
    );

    // 3) Wrap in HTML or let Nest do it
    const finalHtml = `
      <!DOCTYPE html>
      <html>
        <head><title>React SSR in Nest</title></head>
                <script>window.__INITIAL_DATA__ = ${JSON.stringify(
                  props,
                )};</script>
        <body>
          <div id="root">${html}</div>
          <!-- Possibly load a client script here for hydration -->
        </body>
      </html>
    `;

    callback(null, finalHtml);
  } catch (err) {
    callback(err);
  }
}
