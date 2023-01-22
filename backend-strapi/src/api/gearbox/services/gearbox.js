'use strict';

/**
 * gearbox service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gearbox.gearbox');
