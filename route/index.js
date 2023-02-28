const express = require('express')
const projectRoute = require('../route/projectRouter');
const authRoute = require('../route/authRoute')
const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/project',
        route: projectRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
});

module.exports = router;