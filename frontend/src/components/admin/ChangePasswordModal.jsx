import { useState } from 'react';
import { changePassword } from '../../services/api';
import toast from 'react-hot-toast';

const ChangePasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error('New Password is not Matched !');
    }
    if (formData.newPassword.length < 6) {
      return toast.error('Password kam se kam 6 characters ka hona chahiye!');
    }
    setLoading(true);
    try {
      await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      });
      toast.success('Password change ho gaya! 🔒');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Password change failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-[#13132a] border border-white/10 rounded-2xl w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Change Password 🔒</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          <div>
            <label className="block text-gray-400 text-sm mb-2">Purana Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">New Password</label>
            <input
              type="password"
              name="Enter New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">New  Password Confirm</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Enter New Password"
              className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

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
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;