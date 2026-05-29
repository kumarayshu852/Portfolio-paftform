import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../services/api';
import EditProfileModal from '../components/admin/EditProfileModal';
import ChangePasswordModal from '../components/admin/ChangePasswordModal';
import ChangeEmailModal from '../components/admin/ChangeEmailModal';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fetchProfile = () => {
    getProfile()
      .then(res => setProfile(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const [showEmail,setShowEmail]=useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">👤</p>
          <p className="text-white text-xl font-bold mb-2">Not found your Profile</p>
          {user?.role === 'admin' && (
            <button
              onClick={() => setShowEdit(true)}
              className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl"
            >
              Set your Porfile
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] pt-24 px-6 pb-16">

      {/* Background glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Profile Card */}
        <div className="bg-[#13132a] border border-white/10 rounded-2xl overflow-hidden">

          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-purple-900/50 to-blue-900/50" />

          {/* Profile Info */}
          <div className="px-8 pb-8">

            {/* Photo + Name */}
            <div className="flex items-end justify-between -mt-16 mb-6 flex-wrap gap-4">
              <div className="relative">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt="Profile"
                    className="w-28 h-28 rounded-2xl border-4 border-[#13132a] object-cover"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-2xl border-4 border-[#13132a] bg-purple-600 flex items-center justify-center text-4xl font-bold text-white">
                    {profile.user?.name?.charAt(0)}
                  </div>
                )}
              </div>

              {/* Admin Buttons */}
              {user?.role === 'admin' && (
                <div className="flex gap-3 mt-16 sm:mt-0">
                  <button
                    onClick={() => setShowEdit(true)}
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl transition-all duration-200"
                  >
                    ✏️ Edit Profile
                  </button>
                  <button
                  onClick={() => setShowEmail(true)}
                  className="px-5 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 text-sm font-medium rounded-xl transition-all duration-200">
                     👤 Update Account
                     </button>
                  <button
                    onClick={() => setShowPassword(true)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-xl transition-all duration-200"
                  >
                    🔒 Change Password
                  </button>
                </div>
              )}
            </div>

            {/* Name & Bio */}
            <h1 className="text-3xl font-bold text-white mb-1">
              {profile.user?.name}
            </h1>

            {/* Yeh add karo name ke neeche */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded-full font-medium">
              + {profile.user?.role?.charAt(0).toUpperCase() + profile.user?.role?.slice(1)}
              </span>
              </div>
            <p className="text-gray-400 text-base mb-4">{profile.bio}</p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 mb-6">
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  📧 {profile.email}
                </a>
              )}
              {profile.phone && (
                <a href={`tel:${profile.phone}`} className="flex items-center gap-2 text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  📱 {profile.phone}
                </a>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  🌐 {profile.website}
                </a>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-6" />

            {/* Tech Stack */}
            {profile.techStack?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-widest text-gray-400">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm rounded-full"
                    >
                      {/* Object hai toh .name, string hai toh seedha */}
                      {typeof tech === 'object' ? tech.name : tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-white/10 mb-6" />

            {/* Social Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest text-gray-400">
                Social Media Links
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white text-sm transition-all duration-200">
                    GitHub
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white text-sm transition-all duration-200">
                    LinkedIn
                  </a>
                )}
                {profile.youtube && (
                  <a href={profile.youtube} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white text-sm transition-all duration-200">
                    YouTube
                  </a>
                )}
                {profile.twitter && (
                  <a href={profile.twitter} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white text-sm transition-all duration-200">
                    Twitter
                  </a>
                )}
                {profile.facebook && (
                  <a href={profile.facebook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white text-sm transition-all duration-200">
                    Facebook
                  </a>
                )}
                {profile.instagram && (
                  <a href={profile.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white text-sm transition-all duration-200">
                    Instagram
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modals */}
      {showEdit && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEdit(false)}
          onUpdate={fetchProfile}
        />
      )}
      {showPassword && (
        <ChangePasswordModal
          onClose={() => setShowPassword(false)}
        />
      )}
      {showEmail && (
        <ChangeEmailModal
        onClose={() => setShowEmail(false)}
        />
      )}

    </div>
  );
};

export default ProfilePage;