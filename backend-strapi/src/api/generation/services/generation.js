'use strict';

/**
 * generation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::generation.generation');
