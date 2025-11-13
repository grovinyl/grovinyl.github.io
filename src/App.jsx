import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Code, Server, Database, Terminal, ExternalLink, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  const [aboutVisible, setAboutVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === aboutRef.current) setAboutVisible(entry.isIntersecting);
          if (entry.target === projectsRef.current) setProjectsVisible(entry.isIntersecting);
          if (entry.target === skillsRef.current) setSkillsVisible(entry.isIntersecting);
          if (entry.target === contactRef.current) setContactVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: "Cloud Infrastructure Manager",
      description: "Automated deployment system for managing cloud resources across AWS and Azure platforms with real-time monitoring.",
      tech: ["Python", "AWS", "Docker", "Terraform"],
      icon: <Server className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Database Optimization Tool",
      description: "Performance monitoring and query optimization dashboard for PostgreSQL databases with AI-powered suggestions.",
      tech: ["React", "Node.js", "PostgreSQL", "Redis"],
      icon: <Database className="w-6 h-6" />,
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      title: "Network Security Scanner",
      description: "Vulnerability assessment tool for identifying security risks in enterprise networks with automated reporting.",
      tech: ["Python", "Nmap", "Flask", "MongoDB"],
      icon: <Terminal className="w-6 h-6" />,
      gradient: "from-blue-600 to-indigo-600"
    }
  ];

  const skills = [
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 relative overflow-hidden">
      {/* Subtle Gradient Background */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-blue-500/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold relative group cursor-pointer">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {"<Leo Zagkos/>"}
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-500" />
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {[
              { name: 'Home', ref: null },
              { name: 'About', ref: aboutRef },
              { name: 'Projects', ref: projectsRef },
              { name: 'Skills', ref: skillsRef },
              { name: 'Contact', ref: contactRef }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => item.ref ? scrollToSection(item.ref) : window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="relative group text-gray-400 hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50">
            <div className="flex flex-col gap-4 px-6 py-4">
              {[
                { name: 'Home', ref: null },
                { name: 'About', ref: aboutRef },
                { name: 'Projects', ref: projectsRef },
                { name: 'Skills', ref: skillsRef },
                { name: 'Contact', ref: contactRef }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.ref ? scrollToSection(item.ref) : window.scrollTo({ top: 0, behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-300 hover:text-blue-400 transition-colors font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-5xl text-center animate-fade-in relative z-10">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Available for new opportunities</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
              Information Technology
            </span>
            <br />
            <span className="text-white">Specialist</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Building robust systems and elegant solutions for tomorrow's challenges. 
            Transforming complex problems into scalable, innovative technology.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => scrollToSection(projectsRef)}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="px-8 py-4 border-2 border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-6 relative">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`text-center mb-16 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span style={{
                background: 'linear-gradient(to right, rgb(96, 165, 250), rgb(34, 211, 238), rgb(59, 130, 246))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                About Me
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 mb-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                I'm a senior Information Technology major passionate about data analytics, help desk support, and leveraging my overall skills in the information technology sector 
                to deliver accurate and digestible client solutions. 
              </p>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                With expertise spanning database management, systems administration, and IT support, I'm passionate about delivering technical excellence—whether providing 
                responsive help desk support, transforming data into actionable insights, or maintaining secure, efficient systems (or even all three at the same time)!
              </p>
            </div>
          </div>

          <div className="space-y-8">
  {[
    {
      title: "Career Goals",
      icon: <Server className="w-6 h-6" />,
      content: "As I begin my IT career, I'm focused on building a strong technical foundation that will allow me to grow into more complex roles over time. I'm drawn to opportunities in data analytics, system administration, and technical support—areas where I can solve real problems and see the impact of my work. Long-term, I aspire to architect enterprise-level systems and contribute meaningfully to open-source communities. I also hope to eventually become a mentor, helping guide the next generation of IT professionals the way others have helped me.",
      image: "/images/career-goals.jpg", // Replace with your actual image path
      delay: '200ms'
    },
    {
      title: "Values",
      icon: <Code className="w-6 h-6" />,
      content: "I believe in writing clean, maintainable code that others can understand and build upon. Continuous learning is essential in tech—I'm always exploring new tools, frameworks, and best practices to stay current. I value collaboration over competition, knowing that the best solutions come from diverse perspectives working together. Above all, I'm committed to user-centered design thinking, ensuring that the systems and solutions I build actually serve the people who use them.",
      image: "/images/values.jpg", // Replace with your actual image path
      delay: '400ms'
    },
    {
      title: "Hobbies",
      icon: <Terminal className="w-6 h-6" />,
      content: "When I'm not coding, you'll find me hiking and exploring the outdoors—there's something about nature that helps clear my mind and sparks creativity. I love diving into new tech stacks and experimenting with personal projects, especially in gaming and game development. I'm also passionate about sharing what I learn through tech blogging and creating tutorials, believing that teaching others is one of the best ways to solidify your own understanding.",
      image: "/images/hobbies.jpg", // Replace with your actual image path
      delay: '600ms'
    }
  ].map((section, idx) => (
    <div
      key={idx}
      className={`group bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden ${
        aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: section.delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
            <div className="text-blue-400">
              {section.icon}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">{section.title}</h3>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/5">
            <p className="text-gray-300 leading-relaxed">{section.content}</p>
          </div>
          <div className="md:w-2/5">
            <img 
              src={section.image} 
              alt={section.title}
              className="rounded-xl w-full h-48 object-cover border border-slate-700/50 shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span style={{
                background: 'linear-gradient(to right, rgb(96, 165, 250), rgb(34, 211, 238), rgb(59, 130, 246))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Featured Projects
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`group bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer relative overflow-hidden ${
                  projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${project.gradient} bg-opacity-20 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-blue-400">
                        {project.icon}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-blue-500/10 text-blue-300 text-xs font-medium rounded-lg border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span style={{
                background: 'linear-gradient(to right, rgb(96, 165, 250), rgb(34, 211, 238), rgb(59, 130, 246))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Technical Skills
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className={`group flex flex-col items-center transition-all duration-500 ${
                  skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-500/30 h-full flex items-center justify-center">
                    <img 
                      src={skill.logo} 
                      alt={skill.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <span className="text-xs md:text-sm text-gray-400 group-hover:text-blue-400 transition-colors duration-300 text-center font-medium">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 px-6 relative">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span style={{
              background: 'linear-gradient(to right, rgb(96, 165, 250), rgb(34, 211, 238), rgb(59, 130, 246))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Let's Connect
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-8" />
          
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Want to get in contact with me? Let's connect!
          </p>
          
          <div className="flex gap-4 md:gap-6 justify-center flex-wrap mb-12">
            <a 
              href="https://github.com/grovinyl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-5 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:from-blue-600 hover:to-cyan-600 border border-slate-700/50 hover:border-transparent rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 backdrop-blur-xl"
            >
              <Github className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            </a>
            <a 
              href="https://www.linkedin.com/in/leo-zagkos/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-5 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:from-blue-600 hover:to-cyan-600 border border-slate-700/50 hover:border-transparent rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 backdrop-blur-xl"
            >
              <Linkedin className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            </a>
            <a 
              href="mailto:leon.zagkos@gmail.com"
              className="group p-5 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:from-blue-600 hover:to-cyan-600 border border-slate-700/50 hover:border-transparent rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 backdrop-blur-xl"
            >
              <Mail className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 YLeo Zagkos. Crafted with <span className="text-blue-400">React</span> & <span className="text-cyan-400">Tailwind CSS</span>
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  );
}