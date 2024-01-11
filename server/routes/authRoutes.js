const express = require('express');
const router = express.Router();

const { signup, signin, forgotPassword, resetPassword, emailVerification, userDetails, deleteAccount } = require('../controllers/authController');

const { auth } = require('../middlewares/auth');

const { googleUserSignin, googleUserSignup } = require('../controllers/googleauthController');

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/forgot-password', forgotPassword);

router.post('/email-verification', emailVerification);

router.post('/reset-password', resetPassword);

router.get('/user-details', auth, userDetails);

router.post('/google-user/signin', googleUserSignin);

router.post('/google-user/signup', googleUserSignup);

router.delete('/delete-account', deleteAccount);

module.exports = router;