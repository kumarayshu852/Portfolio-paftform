import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, deleteProject } from '../../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = () => {
    getProjects()
      .then(res => setProjects(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Project delete karna chahte ho?')) return;
    try {
      await deleteProject(id);
      toast.success('Project delete ho gaya!');
      fetchProjects();
    } catch (err) {
      toast.error('Delete failed!');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] pt-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your projects</p>
          </div>
          <Link
            to="/admin/add"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all duration-200"
          >
            + Add Project
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#13132a] border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Total Projects</p>
            <p className="text-4xl font-bold text-white">{projects.length}</p>
          </div>
          <div className="bg-[#13132a] border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Technologies Used</p>
            <p className="text-4xl font-bold text-white">
              {[...new Set(projects.flatMap(p => p.technologies))].length}
            </p>
          </div>
          <div className="bg-[#13132a] border border-white/10 rounded-2xl p-6">
            <p className="text-gray-400 text-sm mb-1">Live Projects</p>
            <p className="text-4xl font-bold text-white">
              {projects.filter(p => p.liveLink).length}
            </p>
          </div>
          <div className="bg-[#13132a] border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-1">Total Views</p>
          <p className="text-4xl font-bold text-white">
            {projects.reduce((acc, p) => acc + (p.views || 0), 0)}
            </p>
</div>
        </div>

        {/* Projects Table */}
        <div className="bg-[#13132a] border border-white/10 rounded-2xl overflow-hidden">

          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">All Projects</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📁</p>
              <p className="text-gray-400">No projects – add your first project!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Image</th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Title</th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Technologies</th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Date</th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white font-medium">{project.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{project.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 2).map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-purple-500/10 text-purple-300 text-xs rounded-full border border-purple-500/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/edit/${project._id}`}
                            className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs rounded-lg border border-blue-500/20 transition-all duration-200"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(project._id)}
                            className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs rounded-lg border border-red-500/20 transition-all duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;