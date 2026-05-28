import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-[#13132a] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/20">

      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13132a] to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Title */}
        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-purple-300 transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <Link
            to={`/project/${project._id}`}
            className="flex-1 text-center py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-all duration-200"
          >
            View Details
          </Link>
          {project.liveLink && (
            
             <a href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm rounded-lg transition-all duration-200"
            >
              Live ↗
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;