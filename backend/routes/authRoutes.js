const router=require('express').Router();
const {register,login}=require('../controllers/authController');

// Post /api/auth/register
router.post('/register',register);

// Post/api/auth/login
router.post('/login',login);

module.exports=router;