const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const next = require('next');
const nextRoutes = require('../routes');
const port = parseInt(process.env.PORT, 10) || 3000;
const http2port = 3001;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handler = nextRoutes.getRequestHandler(nextApp);
const mobxReact = require('mobx-react');
const spdy = require('spdy');
const fs = require('fs');
import API from '../utils/api';
import Settings from '../config';
const Raven = require('raven');
const Router = require('./router.js');

nextApp.prepare()
  .then(() => {
    const server = express();
    mobxReact.useStaticRendering(true);

    Raven.config(Settings.sentry.express).install();

    if (server.get('env') != 'development') {
      server.use(Raven.requestHandler());
      server.use(Raven.errorHandler());
      server.use(function onError(err, req, res, next) {
        res.statusCode = 500;
        res.end(res.sentry + '\n');
      });
    }

    server.use(cookieParser());
    server.get('/', Router.index(nextApp));
    server.get('/ico', Router.ico(nextApp));
    server.get('/main', Router.index(nextApp));
    server.get('/about', Router.about(nextApp));
    server.get('/help', Router.help(nextApp));
    server.get('/me', Router.me(nextApp));
    server.get('/likes', Router.likes(nextApp));
    server.get('/ads', Router.ads(nextApp));
    server.get('/new_ad', Router.newAd(nextApp));
    server.get('/not_found', Router.notFound(nextApp));
    server.get('/edit_ad/:ad', Router.editAd(nextApp));
    server.get('/search', Router.search(nextApp));
    server.get('/users/:singleUser', Router.singleUser(nextApp));
    server.get('/shops/:singleShop', Router.singleShop(nextApp));
    server.get('/shops', Router.shops(nextApp));
    server.get('/landing', Router.landing(nextApp));
    server.get('/:category/:subcategory/ad/:ad', Router.ad(nextApp));
    server.get('/:category/:subcategory', Router.subcategory(nextApp));
    server.get('/:category', Router.category(nextApp));
    server.get('*', Router.notFound(nextApp));
    server.use(express.static('public'));

    server.use(handler).listen(port, (err) => {
      if (err) throw err
    });
    //http2
    spdy.createServer({
      key: fs.readFileSync(Settings.sslKey),
      cert:  fs.readFileSync(Settings.sslCert)
    }, server)
      .listen(http2port, (err) => {
        if (err) throw err
      })
  });
