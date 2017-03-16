'use strict';

const express = require('express');
const {match, RouterContext} = require('react-router');
const routes = require('../lib/routes');
const nss_alive = express();

nss_alive.use(express.static('public'));
nss_alive.use((req, res, next) => {
  match({routes, location:req.url},
		async (err, redirect, props) => {

		});
});

nss_alive.listen(8080);
