const router = require('express').Router();
const adminController = require('../controllers/adminController.js');
const apiController = require('../controllers/apiController.js');
// const auth = require('../middlewares/auth');
// const {upload } = require('../middlewares/multer');
const { uploadSingle } = require('../middlewares/multer');
const verifyToken = require('../middlewares/VerifyToken');


router.post('/register', apiController.user_register);
router.post('/login', apiController.login);
router.get('/me', verifyToken ,apiController.me  );
router.get('/logout', verifyToken, apiController.logout);
router.get('/landing_page', apiController.landing_page);
router.get('/detail-page/:id', apiController.detailPage);
router.post('/booking-page', uploadSingle, apiController.bookingPage);
router.post('/email-sender', apiController.emailSender);


module.exports = router;