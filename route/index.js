const express = require("express");
const projectRoute = require("../route/projectRouter");
const authRoute = require("../route/authRoute");
const router = express.Router();
const subPRojectRoute = require("../route/subProjectRouter");

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
