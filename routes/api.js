const trimUtil = require('../util/trimUtil');
const pathUtil = require('../util/checkPathUtil');
const resultUtil = require('../util/responseUtil');

const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.use('/([a-z]+)', function (req, res, next) {
    let originalUrl = req.originalUrl;
    let url = originalUrl.substring(5);
    let pathArray = url.split('/');
    // console.log(pathArray[1]);
    let pathLength = pathArray.length;
    if (pathLength == 1 || pathLength == 2) {
        if (pathUtil.check_table_exist(pathArray[0])) {
            next();
        } else {
            resultUtil.notFoundResponse(res);
            console.log('table is not existed');
        }
    } else if (pathLength == 3) {
        if (pathUtil.check_table_exist(pathArray[0]) && pathUtil.check_table_exist(pathArray[2])) {
            next();
        } else {
            resultUtil.notFoundResponse(res);
            console.log('table is not existed');
        }
    }
});

router
    .get('/([a-z]+)', mainController.find_all)
    .get('/([a-z]+)/([0-9]+)', mainController.find_by_id)
    .post('/([a-z]+)', mainController.create_new)
    .put('/([a-z]+)/([0-9]+)', mainController.update_by_id)
    .delete('/([a-z]+)/([0-9]+)', mainController.delete_by_id);

module.exports = router;