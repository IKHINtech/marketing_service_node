const httpStatus = require("http-status");
const Joi = require("joi");
const ApiError = require("../helper/ApiError");

class SubCategoryValidator {
  async subCategoryCreateValidator(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().required(),
      category_id: Joi.string().guid()
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

module.exports = SubCategoryValidator;
