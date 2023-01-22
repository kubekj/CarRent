'use strict';

/**
 * fuel router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::fuel.fuel');
