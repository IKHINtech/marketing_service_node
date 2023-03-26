const httpStatus = require("http-status");
const Joi = require("joi");
const ApiError = require("../helper/ApiError");

class TypeValidator {
  async typeCreateValidator(req, res, next) {
    const schema = Joi.object({
      sub_category: Joi.string().guid().required(),
      sub_project_id: Joi.string().guid().required(),
      name: Joi.string().required(),
      length_area: Joi.number().required(),
      width_area: Joi.number().required(),
      surface_area: Joi.number().required(),
      bathroom: Joi.number().required(),
      bedroom: Joi.number().required(),
      payment_mode: [
        Joi.object({
          start_at: Joi.date().required(),
          is_active: Joi.bool().required(),
          key: Joi.string(),
          value: Joi.number().required(),
          prioritas: Joi.number().required(),
          payment_mode_detail: [
            Joi.object({
              key: Joi.string().required(),
              value: Joi.number().required(),
              prioritas: Joi.number().required(),
            }),
          ],
        }),
      ],
    });
  }
}
