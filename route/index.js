const express = require("express");
const projectRoute = require("../route/projectRouter");
const authRoute = require("../route/authRoute");
const router = express.Router();
const subPRojectRoute = require("../route/subProjectRouter");
const levelRoute = require("../route/levelRouter");
const unitRoute = require("../route/unitRouter");
const categoryRoute = require("../route/categoryRoute");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/project",
    route: projectRoute,
  },
  {
    path: "/sub_project",
    route: subPRojectRoute,
  },
  {
    path: "/level",
    route: levelRoute,
  },
  {
    path: "/unit",
    route: unitRoute,
  },
  {
    path: "/category",
    route: categoryRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
