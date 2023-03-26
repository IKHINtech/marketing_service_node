const httpStatus = require("http-status");
const Joi = require("joi");
const ApiError = require("../helper/ApiError");

class UnitValidator {
  async unitCreateValidator(req, res, next) {
    const schema = Joi.object({
      level_id: Joi.string().guid().required(),
      type_id: Joi.string().guid().required(),
      code: Joi.string().required(),
      name: Joi.string().required(),
      status: Joi.string().required(),
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

module.exports = UnitValidator;
