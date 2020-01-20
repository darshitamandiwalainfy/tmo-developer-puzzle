/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { environment as env } from './environments/environment';
import { CommonConstants } from '../../../libs/shared/util/src/common.constants';
const axios = require('axios');

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {
        hello: 'world'
      };
    }
  });

  const getChartData = async (symbol, period) => {
    let url = `${env.apiURL}/beta/stock/${symbol}/chart/${period}?token=${
      env.apiKey
    }`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  // Here I am using hapi.js server_methods to leverage default caching mechanism which is memory cache
  // we may use redis or memcache by providing appropriate cache client and policy, while creating server.
  server.method('getChartData', getChartData, {
    generateKey: (symbol, period) => `${symbol}:${period}`,
    cache: {
      expiresIn: 5 * 60 * 1000,
      generateTimeout: 2 * 60 * 1000
    }
  });

  server.route({
    method: 'GET',
    path: `/${CommonConstants.API_ROUTES.STOCK_CHART_DATA}`,
    handler: async (request, h) => {
      const { symbol, period } = request.query;
      try {
        const response = await server.methods.getChartData(symbol, period);
        return response;
      } catch (error) {
        console.error(error);
        return error;
      }
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
