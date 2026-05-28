import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProjects } from '../services/api';
import ProjectCard from '../components/user/ProjectCard';

const HomePage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(res => setProjects(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d1a]">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

        {/* Background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-700/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm mb-8">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            Available for work
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {user ? user.name : 'Your Name'}
            </span>{' '}
            👋
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            I build full stack web applications. Explore my work and creative projects below.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
            
              <a href="#projects"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all duration-200 text-base"
            >
              View Projects →
            </a>
            
              <a href="#contact"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all duration-200 text-base"
            >
              Contact Me
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-16 flex-wrap">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">{projects.length}+</p>
              <p className="text-gray-500 text-sm mt-1">Projects</p>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block" />
            <div className="text-center">
              <p className="text-4xl font-bold text-white">2+</p>
              <p className="text-gray-500 text-sm mt-1">Years Experience</p>
            </div>
            <div className="w-px h-12 bg-white/10 hidden md:block" />
            <div className="text-center">
              <p className="text-4xl font-bold text-white">10+</p>
              <p className="text-gray-500 text-sm mt-1">Technologies</p>
            </div>
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-purple-400 text-sm font-medium mb-3 uppercase tracking-widest">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My Projects
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Here are some of my recent works — built with modern technologies
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-6" />
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🚀</p>
              <p className="text-gray-400 text-xl font-medium">Abhi koi project nahi hai</p>
              <p className="text-gray-600 text-sm mt-2">Admin se login karke projects add karo</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default HomePage;