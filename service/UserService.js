const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const UserDao = require("../dao/userDao");
const responseHandler = require("../helper/responseHandler");
const logger = require("../config/logger");
const { userConstant } = require("../config/constant");
const TokenService = require("../service/TokenService");


class UserService {
  constructor() {
    this.userDao = new UserDao();
    this.tokenService = new TokenService();
  }

  /**
   * Create a user
   * @param {Object} userBody
   * @returns {Object}
   */
  createUser = async (userBody) => {
    try {
      let message =
        "Successfully Registered the account! Please Verify your email.";
      if (await this.userDao.isEmailExists(userBody.email)) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "Email already taken"
        );
      }
      const uuid = uuidv4();
      userBody.email = userBody.email.toLowerCase();
      userBody.password = bcrypt.hashSync(userBody.password, 8);
      userBody.id = uuid;
      userBody.status = userConstant.STATUS_ACTIVE;
      userBody.email_verified = userConstant.EMAIL_VERIFIED_FALSE;

      let userData = await this.userDao.create(userBody);

      if (!userData) {
        message = "Registration Failed! Please Try again.";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      let user = userData.toJSON();
      delete user.password;
      let tokens = {};

      if (userData) {
        tokens = await this.tokenService.generateAuthTokens(user);
      }

      userData = userData.toJSON();
      delete userData.password;

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        message,
        user,
        tokens
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };

  /**
   * Get user
   * @param {String} email
   * @returns {Object}
   */

  isEmailExists = async (email) => {
    const message = "Email found!";
    if (!(await this.userDao.isEmailExists(email))) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Email not Found!!"
      );
    }
    return responseHandler.returnSuccess(httpStatus.OK, message);
  };

  getUserByUuid = async (id) => {
    return this.userDao.findOneByWhere({ id });
  };

  changePassword = async (data, id) => {
    let message = "Login Successful";
    let statusCode = httpStatus.OK;
    let user = await this.userDao.findOneByWhere({ id });

    if (!user) {
      return responseHandler.returnError(
        httpStatus.NOT_FOUND,
        "User Not found!"
      );
    }

    if (data.password !== data.confirm_password) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Confirm password not matched"
      );
    }

    const isPasswordValid = await bcrypt.compare(
      data.old_password,
      user.password
    );
    user = user.toJSON();
    delete user.password;
    if (!isPasswordValid) {
      statusCode = httpStatus.BAD_REQUEST;
      message = "Wrong old Password!";
      return responseHandler.returnError(statusCode, message);
    }
    const updateUser = await this.userDao.updateWhere(
      { password: bcrypt.hashSync(data.password, 8) },
      { uuid }
    );

    if (updateUser) {
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Password updated Successfully!",
        {}
      );
    }

    return responseHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Password Update Failed!"
    );
  };
}

module.exports = UserService;
