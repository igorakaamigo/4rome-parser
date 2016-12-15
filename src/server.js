import express from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import Helmet from 'react-helmet';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux/configureStore';
import routes from './routes';
import bodyParser from 'body-parser';
import fetch from 'isomorphic-fetch';
import jsdom from 'jsdom';

const app = express();

app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.json());

app.options('/fetch', (req, res) => {
  const urls = req.body.urls;
  let result = [];

  req.body.urls.forEach((url) => {
    let response;

    return fetch(url, {
      method: 'get',
      headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, sdch, br',
        'accept-language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
      },
      cache: 'no-cache'
    })
      .then((r) => {
        response = r;
        return r.text();
      })
      .then(text => {
        const dom = jsdom.jsdom(text);
        const title = dom.querySelector('title');
        const h1 = dom.querySelector('h1');
        const keywords = dom.querySelector('meta[name=keywords]');
        const description = dom.querySelector('meta[name=description]');
        const css = req.body.css ? (dom.querySelector(req.body.selector)) : null;

        result.push({
          url: url,
          status: `${response.status} ${response.statusText}`,
          title: title ? title.textContent : '-',
          h1: h1 ? h1.textContent : '-',
          keywords: keywords ? keywords.attributes.content.textContent : '-',
          description: description ? description.attributes.content.textContent : '-',
          css: css ? css.textContent : '-'
        });

        if (urls.length === result.length) {
          res.json(result);
        }
      })
      .catch(error => {
        result.push({
          url: url,
          status: error.toString(),
          title: '-',
          h1: '-',
          keywords: '-',
          description: '-',
          css: '-'
        });

        if (urls.length === result.length) {
          res.json(result);
        }
      });
  });
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
  const assetUrl = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8052';
  let cssBundle = process.env.NODE_ENV === 'production' ? '' : '/public/assets/styles.css';
  let jsBundle = process.env.NODE_ENV === 'production' ? '' : '/public/assets/bundle.js';

  if (process.env.NODE_ENV === 'production') {
    const manifest = require(__dirname + '/../manifest.json');

    cssBundle = `assets/${manifest['main.css']}`;
    jsBundle = `assets/${manifest['main.js']}`;
  }

  return `
    <!DOCTYPE html>
    <html ${head.htmlAttributes.toString()}>
    <head>
        <base target="_blank" href="${process.env.NODE_ENV === 'production' ? process.env.NODE_URL : '//localhost:3002/'}"/>
        ${head.meta.toString()}
        ${head.title.toString()}
        <link rel="stylesheet" href="${assetUrl + cssBundle}">
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
      <script type="application/javascript" src="${assetUrl + jsBundle}"></script>
    </body>
  </html>
  `;
}

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
