const router = require('express').Router();
const protect=require('../middleware/authMiddleware');
const adminOnly=require('../middleware/adminMiddleware');
const {upload}=require('../config/cloudinary');
const{
    getProfile,
    updateProfile,
    changePassword
}=require('../controllers/ProfileController');

// Pubilc

router.get('/',getProfile);

//Admin only
router.put('/',protect,adminOnly,upload.single('photo'),updateProfile);
router.put('/change-password',protect, adminOnly, changePassword);

module.exports =router;