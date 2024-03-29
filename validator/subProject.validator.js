const httpStatus = require("http-status");
const Joi = require("joi");
const ApiError = require("../helper/ApiError");

class SubProjectValidator {
  async subProjectCreateValidator(req, res, next) {
    const schema = Joi.object({
      code: Joi.string().required(),
      name: Joi.string().required(),
      is_active: Joi.boolean(),
      booking_fee: Joi.number().required(),
      description: Joi.string(),
      lat: Joi.number().required(),
      lng: Joi.number().required(),
      project_id: Joi.string().guid().required(),
      sub_project_additional_infos: Joi.array().required().items(Joi.object({
        key: Joi.string().required(),
        prioritas: Joi.number().required(),
        sub_project_additional_info_details: Joi.array().required().items(Joi.object({
          prioritas: Joi.number().required(),
          value: Joi.string().required()
        }))
      })),
      sub_project_facilities: Joi.array().required().items(Joi.object({
        name: Joi.string().required()
      }))
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.body = value;
      return next();
    }
  }
  async subProjectUpdateValidator(req, res, next) {
    const schema = Joi.object({
      id: Joi.string().guid(),
      code: Joi.string().required(),
      name: Joi.string().required(),
      is_active: Joi.boolean(),
      booking_fee: Joi.number().required(),
      description: Joi.string(),
      lat: Joi.number().required(),
      lng: Joi.number().required(),
      project_id: Joi.string().guid().required(),
      sub_project_additional_infos: Joi.array().required().items(Joi.object({
        id: Joi.string().guid(),
        key: Joi.string().required(),
        prioritas: Joi.number().required(),
        sub_project_id: Joi.string().guid(),
        sub_project_additional_info_details: Joi.array().required().items(Joi.object({
          id: Joi.string().guid(),
          prioritas: Joi.number().required(),
          value: Joi.string().required(),
          sub_project_additional_info_id: Joi.string().guid(),
        }))
      })),
      sub_project_facilities: Joi.array().required().items(Joi.object({
        id: Joi.string().guid(),
        name: Joi.string().required(),
        sub_project_id: Joi.string().guid(),
      }))
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.body = value;
      return next();
    }
  }
}

module.exports = SubProjectValidator;
