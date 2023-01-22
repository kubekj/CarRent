import { axiosWrapper } from '../common/axios-wrapper';
import getConfig from "next/config";
import QueryString from 'qs';
import { authService } from './auth.service';

export const carsService = {
    getCars,
    getCarDetailed,
    getCarSummary,
    createRawReservation,
    assignUserToReservation,
    payForReservation,
    getCurrentUserReservations,
    getCurrentUserReservation,
    getBodyTypes,
    getDrives,
    getFuels,
    getGearboxes
};

async function getCars() {
    const query = QueryString.stringify(
      {
        fields: ['engine', 'acceleration', 'pricePerDay'],
        populate: {
          gearbox: {
            fields: ['name']
          },
          drive: {
            fields: ['type']
          },
          model: {
            fields: ['name', 'yearFrom', 'yearTo'],
            populate: {
              model: {
                fields: ['name'],
                populate: {
                  brand: {
                    fields: ['name'],
                    populate: {
                      logo: {
                        fields: ['formats']
                      }
                    }
                  },
                  body_type: {
                    fields: ['type']
                  }
                }
              }
            }
          },
          picture: {
              fields: ['formats']
          },
          fuel: {
            fields: ['type']
          }
        }
      },
      {
        encodeValuesOnly: true
      }
    );

    return axiosWrapper.get(`/api/cars?${query}`)
    .then(res => {
      return res.data?.map(car => 
        {
          console.log(car);
          const attributes = car?.attributes;
          const carGeneration = attributes.model.data?.attributes;
          const carModel = carGeneration.model.data?.attributes;
          const carBrand = carModel.brand.data?.attributes;
          return {
            id: car.id,
            name: [carBrand.name, carModel.name].join(' '),
            engine: attributes.engine,
            acceleration: attributes.acceleration,
            pricePerDay: attributes.pricePerDay,
            brandLogoUrl: carBrand.logo?.data ? carBrand.logo.data?.attributes.formats.thumbnail.url : '',
            carPictureUrl: attributes.picture.data?.attributes.formats.small.url,
            gearbox: attributes.gearbox.data?.attributes.name,
            drive: attributes.drive.data?.attributes.type,
            bodyType: carModel.body_type.data?.attributes.type,
            fuel: attributes.fuel.data?.attributes.type,
          }
      });
      }
    );
};

async function getBodyTypes() {
  const query = QueryString.stringify(
    {
      fields: ['type']
    },
    {
      encodeValuesOnly: true
    }
  );

  return axiosWrapper.get(`/api/body-types?${query}`)
  .then(res => {
    return res.data?.map(bodyType => 
      {
        const attributes = bodyType?.attributes;
        return attributes.type;
      });
    }
  );
};

async function getFuels() {
  const query = QueryString.stringify(
    {
      fields: ['type']
    },
    {
      encodeValuesOnly: true
    }
  );

  return axiosWrapper.get(`/api/fuels?${query}`)
  .then(res => {
    return res.data?.map(fuel => 
      {
        const attributes = fuel?.attributes;
        return attributes.type;
    });
    }
  );
};

async function getDrives() {
  const query = QueryString.stringify(
    {
      fields: ['type']
    },
    {
      encodeValuesOnly: true
    }
  );

  return axiosWrapper.get(`/api/drives?${query}`)
  .then(res => {
    return res.data?.map(drive => 
      {
        const attributes = drive?.attributes;
        return attributes.type;
    });
    }
  );
};

async function getGearboxes() {
  const query = QueryString.stringify(
    {
      fields: ['name']
    },
    {
      encodeValuesOnly: true
    }
  );

  return axiosWrapper.get(`/api/gearboxes?${query}`)
  .then(res => {
    return res.data?.map(gearbox => 
      {
        const attributes = gearbox?.attributes;
        return attributes.name;
    });
    }
  );
};

async function getCarDetailed(id) {
    const query = QueryString.stringify(
      {
        fields: ['engine', 'acceleration', 'pricePerDay', 'description', 'maxSpeed', 'horsePower', 'year'],
        populate: {
          gearbox: {
            fields: ['name']
          },
          drive: {
            fields: ['type']
          },
          fuel: {
            fields: ['type']
          },
          model: {
            fields: ['name', 'yearFrom', 'yearTo'],
            populate: {
              model: {
                fields: ['name'],
                populate: {
                  brand: {
                    fields: ['name'],
                    populate: {
                      logo: {
                        fields: ['formats']
                      }
                    }
                  },
                  body_type: {
                    fields: ['type']
                  }
                }
              }
            }
          },
          galleries: {
            populate: {
              image: {
                fields: ['formats']
              }
            }
          }
        }
      },
      {
        encodeValuesOnly: true
      }
    );

    return axiosWrapper.get(`/api/cars/${id}?${query}`)
    .then(res => {
      const attributes = res.data?.attributes;
      const carGeneration = attributes.model.data?.attributes;
      const carModel = carGeneration.model.data?.attributes;
      const carBrand = carModel.brand.data?.attributes;
      const bodyType = carModel.body_type.data?.attributes
      const carGallery = attributes.galleries?.data ? attributes.galleries.data?.map(image => ({
        id: image.attributes.image.data?.id,
        url: image.attributes.image.data?.attributes.formats.small.url
        }
      )) : [];

      return {
        name: [carBrand.name, carModel.name].join(' '),
        engine: attributes.engine,
        acceleration: attributes.acceleration,
        maxSpeed: attributes.maxSpeed,
        horsePower: attributes.horsePower,
        year: attributes.year,
        description: attributes.description,
        pricePerDay: attributes.pricePerDay,
        brandLogoUrl: carBrand.logo.data ? carBrand.logo.data?.attributes.formats.thumbnail.url : '',
        gallery: carGallery,
        gearbox: attributes.gearbox.data?.attributes.name,
        drive: attributes.drive.data?.attributes.type,
        fuel: attributes.fuel.data?.attributes.type,
        bodyType: bodyType.type,
      }
    });
};

async function getCarSummary(id) {
  const query = QueryString.stringify(
    {
      fields: ['pricePerDay', 'year'],
      populate: {
        model: {
          fields: ['name'],
          populate: {
            model: {
              fields: ['name'],
              populate: {
                brand: {
                  fields: ['name'],
                }
              }
            }
          }
        },
        picture: {
          fields: ['formats']
        },
        reservations: {
          fields: ['dateFrom', 'dateTo'],
          sort: ['dateFrom:asc'],
          filters: {
            $or: [
              {
                dateFrom: {
                  $gt: new Date()
                }
              },
              {
                dateTo: {
                  $gt: new Date()
                }
              }
            ]
          }
        }
      }
    },
    {
      encodeValuesOnly: true
    }
  );

  return axiosWrapper.get(`/api/cars/${id}?${query}`)
  .then(res => {
    const attributes = res.data?.attributes;
    const carGeneration = attributes.model.data?.attributes;
    const carModel = carGeneration.model.data?.attributes;
    const carBrand = carModel.brand.data?.attributes;

    return {
      brand: carBrand.name,
      model: carModel.name,
      year: attributes.year,
      pricePerDay: attributes.pricePerDay,
      carPictureUrl: attributes.picture.data?.attributes.formats.medium.url,
      reservations: attributes.reservations?.data ? attributes.reservations.data?.map(res => ({
        dateFrom: res.attributes.dateFrom,
        dateTo: res.attributes.dateTo
        }
      )) : []
    }
  });
};

async function createRawReservation(data) {
  const requestBody = {
    data: {
      dateFrom: data.pickUpDate,
      dateTo: data.dropOffDate,
      isPaid: false,
      price: data.totalPrice,
      car: data.carId,
      user: authService.isAuthenticated() ? authService.userValue.id : null
    }
  };

  return axiosWrapper.post(`/api/reservations`, requestBody)
  .then(res => {
    return res.data?.id;
  });
};

async function assignUserToReservation(reservationId) {
  const requestBody = {
    data: {
      user: authService.userValue.id
    }
  };

  return axiosWrapper.put(`/api/reservations`, requestBody, reservationId);
};

async function payForReservation(reservationId, paymentType) {
  const requestBody = {
    data: {
      isPaid: 1,
      status: paymentType === "creditCard" ? 'paid' : 'notPaid',
      paymentType: paymentType
    }
  };

  return axiosWrapper.put(`/api/reservations`, requestBody, reservationId)
    .then(res => {
      return res.data?.attributes.isPaid
    });
};

async function getCurrentUserReservations() {
  const query = QueryString.stringify(
    {
      fields: ['email'],
      populate: {
        reservations: {
          fields: ['createdAt', 'isPaid', 'price', 'id', 'dateTo', 'status'],
          sort: ['createdAt:desc'],
          populate: {
            car: {
              fields: ['id'],
              populate: {
                picture: {
                  fields: ['formats']
                }
              }
            }
          }   
        }
      }
    },
    {
      encodeValuesOnly: true
    }
  );

  return axiosWrapper.get(`/api/users/me?${query}`)
    .then(res => {
      const reservations = res?.reservations ? res.reservations.map(reservation => ({
        id: reservation.id,
        createdAt: reservation.createdAt,
        isPaid: reservation.idPaid,
        price: reservation.price,
        status: reservation.status,
        dateTo: reservation.dateTo,
        carLogo: reservation?.car ? reservation.car.picture.formats.small.url : ''
      }
      )) : [];

      return {
        reservations: reservations
      }
    });
};

function getCurrentUserReservation(reservationId) {
  const query = QueryString.stringify(
    {
      fields: ['email'],
      populate: {
        reservations: {
          fields: ['dateFrom', 'isPaid', 'price', 'dateTo', 'paymentType', 'status'],
          sort: ['createdAt:desc'],
          filters: {
            id: {
              $eq: +reservationId
            }
          },
          populate: {
            car: {
              fields: ['year'],
              populate: {
                model: {
                  fields: ['name'],
                  populate: {
                    model: {
                      fields: ['name'],
                      populate: {
                        brand: {
                          fields: ['name'],
                        }
                      }
                    }
                  }
                },
                picture: {
                  fields: ['formats']
                },
              }
            }
          }   
        }
      }
    },
    {
      encodeValuesOnly: true
    }
  );

  return axiosWrapper.get(`/api/users/me?${query}`)
    .then(res => {
      console.log(res)
      const reservation = res.reservations[0];

      return {
        dateFrom: reservation.dateFrom,
        isPaid: reservation.idPaid,
        price: reservation.price,
        dateTo: reservation.dateTo,
        paymentType: reservation.paymentType,
        status: reservation.status,
        car: {
          name: reservation.car.model.model.brand.name +" "+ reservation.car.model.model.name +" "+ reservation.car.year+" r.",
          logo: reservation?.car ? reservation.car.picture.formats.large.url : ''
        }
      }
    });
};