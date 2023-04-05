const httpStatus = require("http-status");
const AuthService = require("../service/AuthService");
const TokenService = require("../service/TokenService");
const UserService = require("../service/UserService");
const logger = require("../config/logger");
const { tokenTypes } = require("../config/tokens");

class AuthController {
  constructor() {
    this.userService = new UserService();
    this.tokenService = new TokenService();
    this.authService = new AuthService();
  }

  register = async (req, res) => {
    try {
      const user = await this.userService.createUser(req.body);
      let tokens = {};
      const { status } = user.response;
      if (user.response.status) {
        tokens = await this.tokenService.generateAuthTokens(user.response.data);
      }

      const { message, data } = user.response;
      res.status(user.statusCode).send({ status, message, data, tokens });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  checkEmail = async (req, res) => {
    try {
      const isExists = await this.userService.isEmailExists(
        req.body.email.toLowerCase()
      );
      res.status(isExists.statusCode).send(isExists.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await this.authService.loginWithEmailPassword(
        email.toLowerCase(),
        password
      );
      const { message } = userData.response;
      const { data } = userData.response;
      const { status } = userData.response;
      const code = userData.statusCode;
      let tokens = {};
      if (userData.response.status) {
        tokens = await this.tokenService.generateAuthTokens(data);
      }
      const user = data
      res.status(userData.statusCode).send({ status, code, message, user, tokens });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  logout = async (req, res) => {
    await this.authService.logout(req, res);
    res.status(httpStatus.NO_CONTENT).send();
  };

  refreshTokens = async (req, res) => {
    try {
      const refreshTokenDoc = await this.tokenService.verifyToken(
        req.body.refresh_token,
        tokenTypes.REFRESH
      );
      const user = await this.userService.getUserByUuid(
        refreshTokenDoc.user_uuid
      );
      if (user == null) {
        res.status(httpStatus.BAD_GATEWAY).send("User Not Found!");
      }
      await this.tokenService.removeTokenById(refreshTokenDoc.id);
      const tokens = await this.tokenService.generateAuthTokens(user);
      res.send(tokens);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  changePassword = async (req, res) => {
    try {
      const responseData = await this.userService.changePassword(
        req.body,
        req.user.uuid
      );
      res.status(responseData.statusCode).send(responseData.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  profile = async (req, res) => {
    try {

      const authorization =
        req.headers.authorization !== undefined
          ? req.headers.authorization.split(" ")
          : [];
      let token = await this.tokenService.tokenDao.findOne({
        token: authorization[1],
        type: tokenTypes.ACCESS,
        blacklisted: false
      });

      const responseData = await this.userService.getUserByUuid(token.user_id)
      res.status(httpStatus.OK).json(responseData)

    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_REQUEST).send(e);

    }
  }
}

module.exports = AuthController;
