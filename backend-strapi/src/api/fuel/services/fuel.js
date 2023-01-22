'use strict';

/**
 * fuel service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fuel.fuel');
