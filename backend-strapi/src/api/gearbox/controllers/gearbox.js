'use strict';

/**
 * gearbox controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::gearbox.gearbox');
