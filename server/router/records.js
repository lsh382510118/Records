const router = require('koa-router')();
const controller = require('../controller/recordController.js');

router.post('/recordsAdd', controller.add);
router.post('/recordsList', controller.getList);
router.post('/delRecord', controller.del);
router.post('/updateRecord', controller.update);

module.exports = router;
