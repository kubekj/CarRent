'use strict';
const utils = require('@strapi/utils');
const moment = require('moment/moment');
const { ApplicationError } = utils.errors;
/**
 * reservation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::reservation.reservation', ({ strapi }) => ({
    async create(params) {
        const data = params.data
        const dateFrom = moment(data.dateFrom);
        const dateTo = moment(data.dateTo);

        if (dateFrom.add(21, 'hours') > dateTo) {
            throw new ApplicationError("Data oddania auta musi byc co najmniej dobe po dacie wypozyczenia");
        } else if (data.dateFrom < new Date().toISOString()) {
            throw new ApplicationError("Czas odbioru nie moze byc w przeszlosci");
        } 

        const query = {
            fields: ['id'],
            populate: {
              reservations: {
                fields: ['dateFrom', 'dateTo'],
                sort: ['dateFrom:asc'],
                filters: {
                      dateTo: {
                        $gt: new Date().toISOString()
                      }
                }
              }
            }
          }

        const results = await strapi.entityService.findOne('api::car.car', data.car, query);
        const reservations = results.reservations;

        reservations.forEach(reservation => {
            if (!((dateTo.toISOString() < reservation.dateFrom) || (dateFrom.toISOString() > reservation.dateTo))) {
                throw new ApplicationError("Daty rezerwacji nachodza na siebie");
            }
        });

        const result = await super.create(params);
        return result;
    }
}));
