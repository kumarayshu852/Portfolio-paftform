const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const { upload } = require('../config/cloudinary');
const {
  getProjects,
  getProjectById,
  addProject,
  editProject,
  deleteProject
} = require('../controllers/projectController');

// Public routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin only routes
router.post('/', protect, adminOnly, upload.single('image'), addProject);
router.put('/:id', protect, adminOnly, upload.single('image'), editProject);
router.delete('/:id', protect, adminOnly, deleteProject);

module.exports = router;