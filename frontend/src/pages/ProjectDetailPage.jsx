import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../services/api';

const ProjectDetailPage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getProjectById(id)
      .then(res => setProject(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-white text-xl font-bold mb-2">Project nahi mila</p>
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            Home pe wapas jao
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] pt-24 px-6 pb-16">

      {/* Background glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Projects
        </Link>

        {/* Main Card */}
        <div className="bg-[#13132a] border border-white/10 rounded-2xl overflow-hidden">

          {/* Project Image */}
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13132a] via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">

            {/* Title & Date */}
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
              <h1 className="text-4xl font-bold text-white">{project.title}</h1>
              <span className="text-gray-500 text-sm mt-2">
                {new Date(project.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 text-gray-400">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-8" />

            {/* Action Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              {project.liveLink && (
                
                  <a href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all duration-200"
                >
                  🚀 Live Demo
                </a>
              )}
              {project.githubLink && (
                
                 <a href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all duration-200"
                >
                  GitHub →
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;