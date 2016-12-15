import express from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import Helmet from 'react-helmet';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux/configureStore';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express();

app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.json());

app.post('/fetch', (req, res) => {
  let result = [];

  req.body.urls.forEach((url) => {
    result.push({
      url: url,
      status: '200 OK',
      title: 'Это вот тайтл страницы',
      h1: 'Это H1 страницы',
      keywords: 'Это ключевые слова страницы',
      description: 'Это описание страницы',
      css: 'Это данные, полученные при помощи селектора'
    });
  });

  res.json(result);
});

app.use((req, res) => {
  const store = configureStore();

  match({ routes: routes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      return res.status(500).send(error.message);
    }

    if (!renderProps) {
      return res.status(404).send('Not found');
    }

    const markup = ReactDom.renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );
    const head = Helmet.rewind();
    const state = store.getState();

    return res.end(renderHTML(markup, head, state));
  });
});

function renderHTML(markup, head, initialState) {
  const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8052' : '/';

  return `
    <!DOCTYPE html>
      <html ${head.htmlAttributes.toString()}>
      <head>
          ${head.meta.toString()}
          ${head.base.toString()}
          ${head.title.toString()}
          <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
          <script type="application/javascript">
              window.fluxstate = ${JSON.stringify(initialState)};
          </script>
          <!--[if lt IE 9]>
            <script>
              (function(){
                var ef = function(){};
                window.console = window.console || {log:ef,warn:ef,error:ef,dir:ef};
              }());
            </script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
          <![endif]-->
      </head>
      <body>
        <div id="react-markup">${markup}</div>
        <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
