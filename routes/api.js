const router = require('express').Router();
const apiController = require('../controllers/apiController.js');
const auth = require('../middlewares/auth');
// const {upload } = require('../middlewares/multer');
const { uploadSingle } = require('../middlewares/multer');
router.get('/landing_page', apiController.landing_page);
router.get('/detail-page/:id', apiController.detailPage);
router.post('/booking-page', uploadSingle, apiController.bookingPage);


module.exports = router;