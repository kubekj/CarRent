'use strict';

/**
 * car controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::car.car');

// module.exports = createCoreController('api::car.car', ({ strapi }) => ({
//     async find(ctx) {
//         const { query } = ctx;

//         const entity = await strapi.entityService.findMany('api::car.car', {
//             ...query,
//             populate: {
//                 model: {
//                     populate: {
//                         model: true
//                     }
//                 },
//                 fuel: {
//                 },
//                 gearbox: {},
//                 drive: {}
//             },
//         });
//         const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

//         return this.transformResponse(sanitizedEntity);

//     }
// }));