import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProjectById, editProject } from '../../services/api';
import toast from 'react-hot-toast';

const EditProjectPage = () => {
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
  const [fetching, setFetching] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProjectById(id)
      .then(res => {
        const p = res.data;
        setFormData({
          title: p.title,
          description: p.description,
          technologies: p.technologies.join(', '),
          githubLink: p.githubLink || '',
          liveLink: p.liveLink || ''
        });
        setPreview(p.imageUrl);
      })
      .catch(() => toast.error('Project load nahi hua'))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('technologies', formData.technologies);
      data.append('githubLink', formData.githubLink);
      data.append('liveLink', formData.liveLink);
      if (image) data.append('image', image);
      await editProject(id, data);
      toast.success('Project update ho gaya! ✅');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] pt-24 px-6 pb-12">
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
            <h1 className="text-3xl font-bold text-white">Edit Project</h1>
            <p className="text-gray-400 text-sm mt-1">Project update karo</p>
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
                required
                rows={4}
                className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm resize-none"
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Technologies *
                <span className="text-gray-600 ml-2">(comma se separate karo)</span>
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
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
                  placeholder="https://github.com/..."
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
                  placeholder="https://myproject.com"
                  className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Project Image
                <span className="text-gray-600 ml-2">(change nahi karna toh chhod do)</span>
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 text-base"
            >
              {loading ? 'Updating...' : 'Update Project ✅'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProjectPage;