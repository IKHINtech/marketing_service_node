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
