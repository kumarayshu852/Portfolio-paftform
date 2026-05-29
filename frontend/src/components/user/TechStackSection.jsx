import { useState, useEffect, useRef } from 'react';

const categoryColors = {
  Frontend: 'from-purple-500 to-blue-500',
  Backend: 'from-green-500 to-teal-500',
  Database: 'from-orange-500 to-red-500',
  Tools: 'from-pink-500 to-purple-500'
};

const categoryBg = {
  Frontend: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
  Backend: 'bg-green-500/10 border-green-500/20 text-green-300',
  Database: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
  Tools: 'bg-pink-500/10 border-pink-500/20 text-pink-300'
};

const TechStackSection = ({ techStack }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
       
  if (!techStack || techStack.length=== 0) return null;
  const filteredSkills = (activeFilter === 'All'
    ? techStack
    : techStack.filter(s => s.category === activeFilter)
    ).filter(s => s.name);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[#0a0a14]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-purple-400 text-sm font-medium mb-3 uppercase tracking-widest">Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Tech Stack</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Technologies I work with every day
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-6" />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, i) => (
            <div
              key={i}
              className="group bg-[#13132a] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Devicon */}
                  <img
                    src={skill.name ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.name.toLowerCase()}/${skill.name.toLowerCase()}-original.svg` : ''}
                    alt={skill.name}
                    className="w-8 h-8"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.name.toLowerCase()}/${skill.name.toLowerCase()}-plain.svg`;
                    }}
                  />
                  <span className="text-white font-semibold">{skill.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Category Badge */}
                  <span className={`px-2 py-0.5 text-xs rounded-full border ${categoryBg[skill.category] || categoryBg.Frontend}`}>
                    {skill.category}
                  </span>
                  {/* Percentage tooltip */}
                  <span className="text-gray-400 text-sm font-medium">
                    {skill.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${categoryColors[skill.category] || categoryColors.Frontend} rounded-full transition-all duration-1000 ease-out`}
                  style={{
                    width: animated ? `${skill.percentage}%` : '0%'
                  }}
                />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechStackSection;