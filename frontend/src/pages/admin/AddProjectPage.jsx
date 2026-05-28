import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addProject } from '../../services/api';
import toast from 'react-hot-toast';

const AddProjectPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error('Image upload karo!');
    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('technologies', formData.technologies);
      data.append('githubLink', formData.githubLink);
      data.append('liveLink', formData.liveLink);
      data.append('image', image);
      await addProject(data);
      toast.success('Project add ho gaya! 🎉');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] pt-28 px-6 pb-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/admin"
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all duration-200"
          >
            ← Back
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Add New Project</h1>
            <p className="text-gray-400 text-sm mt-1">Add New Project</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#13132a] border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Loan Management System"
                required
                className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write about the project..."
                required
                rows={4}
                className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm resize-none"
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Technologies *
                <span className="text-gray-600 ml-2">(separate with a comma)</span>
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                required
                className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm"
              />
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">GitHub Link</label>
                <input
                  type="url"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  placeholder="Enter your GitHubLink..."
                  className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Live Link</label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  placeholder="Enter your LiveLink..."
                  className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Image Upload — FIXED */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">Project Image *</label>

              {/* Preview */}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}

              {/* Simple file input — no overlap */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full text-gray-400 text-sm file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-500 file:transition-all"
              />
              <p className="text-gray-600 text-xs mt-2">JPG, PNG, WEBP supported</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 text-base"
            >
              {loading ? 'Uploading...' : 'Upload & Save Project '}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjectPage;