'use strict';

/**
 * drive service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::drive.drive');
