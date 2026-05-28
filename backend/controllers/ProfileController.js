const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne().populate('user', 'name email role');
    if (!profile) {
      return res.status(404).json({ msg: 'Profile nahi mila' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      bio, techStack, email,
      phone, github, linkedin,
      youtube, twitter, facebook,
      instagram, website
    } = req.body;

    const updateData = {
      user: req.user.id,
      bio,
      techStack: techStack ? techStack.split(',').map(t => t.trim()) : [],
      email,
      phone,
      github,
      linkedin,
      youtube,
      twitter,
      facebook,
      instagram,
      website
    };

    // Galat tha: req=file.path — sahi hai req.file.path
    if (req.file) {
      updateData.photo = req.file.path;
    }

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      updateData,
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const User = require('../models/User');
    // Galat tha: required('bcryptjs') — sahi hai require('bcryptjs')
    const bcrypt = require('bcryptjs');

    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Purana password galat hai' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ msg: 'Kam se kam 6 characters chahiye' });
    }

    // Galat tha: user.pasword — sahi hai user.password
    user.password = newPassword;
    await user.save();

    res.json({ msg: 'your Password Changed!' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};