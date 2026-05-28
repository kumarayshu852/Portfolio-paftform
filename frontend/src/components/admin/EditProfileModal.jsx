import { useState } from 'react';
import { updateProfile } from '../../services/api';
import toast from 'react-hot-toast';

const EditProfileModal = ({ profile, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    bio: profile.bio || '',
    techStack: profile.techStack?.join(', ') || '',
    email: profile.email || '',
    phone: profile.phone || '',
    github: profile.github || '',
    linkedin: profile.linkedin || '',
    youtube: profile.youtube || '',
    twitter: profile.twitter || '',
    facebook: profile.facebook || '',
    instagram: profile.instagram || '',
    website: profile.website || ''
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(profile.photo || null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (photo) data.append('photo', photo);
      await updateProfile(data);
      toast.success('Profile update ho gaya! ✅');
      onUpdate();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-[#13132a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Photo */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Profile Photo</label>
            {preview && (
              <img src={preview} alt="Preview" className="w-20 h-20 rounded-xl object-cover mb-2" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm resize-none"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Tech Stack (separate with comma)</label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="Tech Stack"
              className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['email', 'phone', 'website', 'github', 'linkedin', 'youtube', 'twitter', 'facebook', 'instagram'].map(field => (
              <div key={field}>
                <label className="block text-gray-400 text-sm mb-2 capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-sm disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;