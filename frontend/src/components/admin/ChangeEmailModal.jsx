import { useState } from "react";
import { changeEmail } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from 'react-hot-toast';

const ChangeEmailModal = ({ onClose }) => {
  const { user, login, token } = useAuth();
  const [formData, setFormData] = useState({
    newName: user?.name || '',
    newEmail: user?.email || '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await changeEmail(formData);
      toast.success('Your account has been Updated! ');
      login({ ...user, email: res.data.email, name: res.data.name }, token);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-[#13132a] border border-white/10 rounded-2xl w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Update Account 👤</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Name */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Name</label>
            <input
              type="text"
              name="newName"
              value={formData.newName}
              onChange={handleChange}
              required
              placeholder="Apna naam"
              className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              type="email"
              name="newEmail"
              value={formData.newEmail}
              onChange={handleChange}
              required
              placeholder="naya@email.com"
              className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Current Password Confirm</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter Your CurrentPassword"
              className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm"
            />
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

export default ChangeEmailModal;