const httpStatus = require("http-status");
const Joi = require("joi");
const ApiError = require("../helper/ApiError");

class LevelValidator {
  async levelCreateValidator(req, res, next) {
    const schema = Joi.object({
      code: Joi.string().required(),
      name: Joi.string().required(),
      sub_project_id: Joi.string().guid().required(),
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

module.exports = LevelValidator;
