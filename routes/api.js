const router = require('express').Router();
const apiController = require('../controllers/apiController.js');
const auth = require('../middlewares/auth');
// const {upload } = require('../middlewares/multer');
const { uploadSingle, uploadMultiple } = require('../middlewares/multer');
router.get('/member/landing_page', apiController.landing_page);


module.exports = router;