import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Code, Server, Database, Terminal, ExternalLink, Menu, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Image Gallery Sub-component ───────────────────────────────────────────────
function ImageGallery({ images, alt }) {
  const [index, setIndex] = useState(0);

  const prev = (e) => {
    e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  };

  const currentImage = images[index];
  const caption = typeof currentImage === 'object' ? currentImage.caption : null;
  const src = typeof currentImage === 'object' ? currentImage.src : currentImage;

  return (
    <div className="relative md:w-2/5 group/gallery">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl border border-slate-700/50 shadow-lg aspect-square">
        <img
          src={src}
          alt={`${alt} ${index + 1}`}
          className="w-full h-full object-cover object-center transition-all duration-500"
        />

        {/* Caption overlay */}
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover/gallery:translate-y-0 transition-transform duration-300">
            <p className="text-white text-sm font-medium leading-snug">{caption}</p>
          </div>
        )}

        {/* Prev / Next Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-green-600/80 text-white transition-all duration-200 opacity-0 group-hover/gallery:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-green-600/80 text-white transition-all duration-200 opacity-0 group-hover/gallery:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image count badge */}
        {images.length > 1 && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/50 rounded-full text-xs text-gray-300">
            {index + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index ? 'bg-green-400 w-5' : 'bg-slate-600 hover:bg-green-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Portfolio Component ───────────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  const [aboutVisible, setAboutVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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

  const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  const projects = [
    {
      title: "AR-boretum",
      description: "Developed an interactive AR experience in Unity (C#) for a local arboretum, enabling visitors to scan QR codes at plant exhibits to trigger educational 3D animations and information displays on their devices.",
      tech: ["C#", "Unity", ".NET"],
      icon: <Server className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Library Database Application",
      description: "Created a Full-Stack Web Application that allows users to add, edit, delete, and update book and library section information. Login, registration, and authentication was also implemented to allow users and administrators to have different access privileges.",
      tech: ["React", "Node.js", "MongoDB", "Express.js"],
      icon: <Database className="w-6 h-6" />,
      gradient: "from-emerald-500 to-green-600"
    },
    {
      title: "Network Security Scanner",
      description: "Vulnerability assessment tool for identifying security risks in enterprise networks with automated reporting.",
      tech: ["Python", "Nmap", "Flask", "MongoDB"],
      icon: <Terminal className="w-6 h-6" />,
      gradient: "from-green-600 to-teal-600"
    }
  ];

  const skills = [
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "WireShark", logo: "/images/Wireshark.jpg" },
    { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
    { name: "Cisco Packet Tracer", logo: "/images/cisco.png" },
  ];


  const aboutSections = [
    {
      title: "Career Goals",
      icon: <Server className="w-6 h-6" />,
      content: "My main goal through my work in IT is to use my technical skills to foster community and help others. My dream job is truly one where I can both learn and teach something new every day. I have particular passions for educational technology and the intersection between nature and the systems we use to keep it safe.",
      images: [
        { src: "/images/IMG_9009.jpg", caption: "Add a caption here" },
        // { src: "/images/career2.jpg", caption: "Another caption" },
      ],
      delay: '200ms'
    },
    {
      title: "Values",
      icon: <Code className="w-6 h-6" />,
      content: "Through my different roles and volunteer opportunities, people have always been centered in what I do. I value human connection and collaboration over competition, and bring empathy and understanding into every role that I come into.\n\n\nI have always been one to connect people with each other and utilize resources to help in any way I can. I am the proud refounder and President of oSTEM @ UCF and a current Resident Assistant at the university; both of these roles allow me to use my skillset to help others around me.\n\n\nI value service and giving back to my community, whether that be through my job or through volunteer work.",
      images: [
        { src: "/images/IMG_7630.jpg", caption: "Add a caption here" },
        // { src: "/images/values2.jpg", caption: "Another caption" },
      ],
      delay: '400ms'
    },
    {
      title: "Hobbies",
      icon: <Terminal className="w-6 h-6" />,
      content: "I am a nature enthusiast and love spending time outdoors. Recentering through hikes and outdoor challenges allows me to approach my work with a fresh perspective.\n\nAs a former professional musician, I also have a deep love for music and routinely partake in solo artist performance nights and help local band programs with their audio engineering.",
      images: [
        { src: "/images/IMG_4596.jpg", caption: "Add a caption here" },
        // { src: "/images/hobbies2.jpg", caption: "Another caption" },
      ],
      delay: '600ms'
    }
  ];

  // Gradient heading style (now green)
  const gradientHeading = {
    background: 'linear-gradient(to right, rgb(74, 222, 128), rgb(52, 211, 153), rgb(34, 197, 94))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 relative overflow-hidden">
      {/* Subtle Charcoal-Green Gradient Blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-green-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* ── Navigation ────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 shadow-lg shadow-green-500/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold relative group cursor-pointer">
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              {"<Leo Zagkos/>"}
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-500" />
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
                className="relative group text-gray-400 hover:text-green-400 transition-colors duration-300 font-medium"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-green-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/50">
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
                  className="text-left text-gray-300 hover:text-green-400 transition-colors font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-5xl text-center animate-fade-in relative z-10">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent animate-gradient">
              Information Technology
            </span>
            <br />
            <span className="text-white">Specialist</span>
          </h1>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => scrollToSection(projectsRef)}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <a
              href="/resume_zagkos_repaired.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 border-2 border-green-500/50 hover:border-green-400 hover:bg-green-500/10 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              View Resume
            </a>
          </div>
        </div>
      </section>

      {/* ── About Section ─────────────────────────────────────────────────────── */}
      <section ref={aboutRef} className="py-20 px-6 relative">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span style={gradientHeading}>About Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
          </div>

          {/* Intro card */}
          <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-zinc-700/50 hover:border-green-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 mb-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                My name is Leo and I am a graduating Information Technology Senior at The University of Central Florida. I have a passion for technology and the ways that it can be used to connect people, solve problems, and create new opportunities.
              </p>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                I am passionate about delivering technical solutions that are not only effective, but user-friendly and serve to bridge the gap between complex technology and the people that can get the most out of it.
              </p>
            </div>
          </div>

          {/* Career Goals / Values / Hobbies cards */}
          <div className="space-y-8">
            {aboutSections.map((section, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row gap-6 transition-all duration-1000 ${
                  aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: section.delay }}
              >
                {/* Text Card */}
                <div className="group flex-1 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 backdrop-blur-xl rounded-2xl p-8 border border-zinc-700/50 hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                        <div className="text-green-400">{section.icon}</div>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">{section.content}</p>
                  </div>
                </div>

                {/* Gallery Card */}
                <div className="md:w-80 lg:w-96 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 backdrop-blur-xl rounded-2xl p-4 border border-zinc-700/50 hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 flex-shrink-0">
                  <ImageGallery images={section.images} alt={section.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Section ──────────────────────────────────────────────────── */}
      <section ref={projectsRef} className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span style={gradientHeading}>Featured Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`group bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 backdrop-blur-xl rounded-2xl p-6 border border-zinc-700/50 hover:border-green-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 cursor-pointer relative overflow-hidden ${
                  projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${project.gradient} bg-opacity-20 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-green-400">{project.icon}</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-green-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-green-500/10 text-green-300 text-xs font-medium rounded-lg border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/40 transition-all duration-300"
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

      {/* ── Skills Section ────────────────────────────────────────────────────── */}
      <section ref={skillsRef} className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span style={gradientHeading}>Technical Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
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
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 backdrop-blur-xl rounded-2xl p-4 border border-zinc-700/50 group-hover:border-green-500/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-green-500/30 h-full flex items-center justify-center">
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <span className="text-xs md:text-sm text-gray-400 group-hover:text-green-400 transition-colors duration-300 text-center font-medium">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Section ───────────────────────────────────────────────────── */}
      <section ref={contactRef} className="py-20 px-6 relative">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span style={gradientHeading}>Let's Connect</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full mb-8" />

          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Want to get in contact with me? Let's connect!
          </p>

          <div className="flex gap-4 md:gap-6 justify-center flex-wrap mb-12">
            {[
              { href: "https://github.com/grovinyl", icon: <Github className="w-7 h-7 group-hover:rotate-12 transition-transform" />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/leo-zagkos/", icon: <Linkedin className="w-7 h-7 group-hover:rotate-12 transition-transform" />, label: "LinkedIn" },
              { href: "mailto:leon.zagkos@gmail.com", icon: <Mail className="w-7 h-7 group-hover:rotate-12 transition-transform" />, label: "Email" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group p-5 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 hover:from-green-600 hover:to-emerald-600 border border-zinc-700/50 hover:border-transparent rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/50 backdrop-blur-xl"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-zinc-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Leo Zagkos. Crafted with <span className="text-green-400">React</span> & <span className="text-emerald-400">Tailwind CSS</span>
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1.2s ease-out; }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  );
}
