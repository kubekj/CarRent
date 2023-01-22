'use strict';

/**
 * fuel controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::fuel.fuel');
