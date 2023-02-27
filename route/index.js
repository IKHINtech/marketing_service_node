const express = require('express')
const projectRoute = require('../route/projectRouter');
const router = express.Router();

const defaultRoutes = [
    {
        path: '/project',
        route: projectRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
});

module.exports = router;