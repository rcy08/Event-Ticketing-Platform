const express = require('express');
const router = express.Router();

const { signup, signin, forgotPassword, resetPassword, emailVerification, userDetails, deleteAccount } = require('../controllers/authController');

const { auth } = require('../middlewares/auth');

const { googleUserSignin, googleUserSignup } = require('../controllers/googleauthController');

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/forgot-password', forgotPassword);

router.post('/email-verification/:verificationToken', emailVerification);

router.post('/reset-password/:resetToken', resetPassword);

router.get('/user-details', auth, userDetails);

router.post('/google-user/signin', googleUserSignin);

router.post('/google-user/signup', googleUserSignup);

router.delete('/delete-account/:id', deleteAccount);

module.exports = router;