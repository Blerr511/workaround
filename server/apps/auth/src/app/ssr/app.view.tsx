import { App, AppProps } from '@wr/oauth-view';
import { JSXTemplate } from './ssr.types';

export const AppView = (
  data: AppProps & { renderProps: JSXTemplate.RenderProps },
) => {
  console.log(data);
  return (
    <html>
      <body>
        <h1 className="foo-class">{data.name}</h1>
        <div>
          Request path: {data.renderProps.$req.path} from ip{' '}
          {data.renderProps.$req.ip}
        </div>
        <App {...data} />
      </body>
    </html>
  );
};
