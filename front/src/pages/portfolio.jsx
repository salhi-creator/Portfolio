import { useState } from "react";
import { Menu, X, Send } from "lucide-react";
import bgPic from "@assets/abstract-black-blue-marble-textured-background.jpg";
import PrfPic from "@assets/609069957_1991315548082046_5880687576320858100_n.webp";
/**
 * PORTFOLIO CONFIGURATION
 * Edit these values to customize your portfolio
 */
const PORTFOLIO_CONFIG = {
  // Profile section
  profile: {
    name: "Salhi Abdle Hakim (Sage)",
    title: "Full Stack Developer",
    description:
      "I create modern web experiences with clean code and innovative design. Specializing in React, Node.js, and UI/UX.",
    image: PrfPic, // Replace with your image URL
    backgroundImage: bgPic, // Replace with your background
  },

  // What you do section
skills: [
  {
    icon: "💻",
    title: "Web Development",
    description: "Building responsive and performant web applications",
  },
  {
    icon: "📱",
    title: "Application Development",
    description: "Designing and developing scalable desktop and mobile applications",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Creating beautiful and intuitive user interfaces",
  },
  {
    icon: "⚡",
    title: "Performance",
    description: "Optimizing code for speed and efficiency",
  },
],

  // Projects section
  projects: [
    {
      title: "Project One",
      description:
        "Vesper is a social media web app featuring authentication, user following, real-time chat, and content posting. It’s currently under active development as new features continue to be integrated.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      technologies: ["React", "Node.js","socket.io", "tailwind", "MongoDB"],
      link: "https://vesper-self.vercel.app",
    },
    {
      title: "Project Two",
      description: "Another amazing project showcasing your skills",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop",
      technologies: ["Next.js", "Tailwind", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Project Three",
      description: "Third project demonstrating your expertise",
      image:
        "https://images.unsplash.com/photo-1597239481463-c76e4c4c3f66?w=400&h=300&fit=crop",
      technologies: ["Vue.js", "Firebase", "TypeScript"],
      link: "#",
    },
  ],

  // Contact section
  contact: {
    telegram: "https://t.me/SageRedbot", // Replace with your Telegram bot link
    email: "hakimsallh79@gmail.com",
    github: "https://github.com/salhi-creator",
    linkedin: "https://linkedin.com/in/yourname",
  },
};

/**
 * MAIN PORTFOLIO COMPONENT
 */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white flex flex-col  overflow-hidden">
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="font-bold text-xl">Portfolio</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <a href="#home" className="hover:text-gray-400 transition">
                Home
              </a>
              <a href="#about" className="hover:text-gray-400 transition">
                About
              </a>
              <a href="#projects" className="hover:text-gray-400 transition">
                Projects
              </a>
              <a href="#contact" className="hover:text-gray-400 transition">
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded transition"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2">
              <a
                href="#home"
                className="block p-2 hover:bg-white/10 rounded transition"
              >
                Home
              </a>
              <a
                href="#about"
                className="block p-2 hover:bg-white/10 rounded transition"
              >
                About
              </a>
              <a
                href="#projects"
                className="block p-2 hover:bg-white/10 rounded transition"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="block p-2 hover:bg-white/10 rounded transition"
              >
                Contact
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* HERO SECTION - Profile & Description */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-16 relative overflow-hidden"
        style={{
          backgroundImage: `url('${PORTFOLIO_CONFIG.profile.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Profile Image with animation */}
            <div className="flex justify-center animate-fade-in-left">
              <div id="imgCadr" className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Animated border ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-pulse" />

                {/* Profile Image */}
                <img
                  src={PORTFOLIO_CONFIG.profile.image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Right: Text Content with animation */}
            <div className="space-y-6 animate-fade-in-right">
              <div>
                <h1
                  className="text-5xl xs:align-center md:text-6xl font-bold mb-2 leading-tight"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 1000,
                  }}
                >
                  {PORTFOLIO_CONFIG.profile.name}
                </h1>
                <p
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 900,
                  }}
                  className="text-xl md:text-2xl text-gray-300 font-light"
                >
                  {PORTFOLIO_CONFIG.profile.title}
                </p>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                {PORTFOLIO_CONFIG.profile.description}
              </p>

              {/* CTA Button */}
              <div className="flex gap-4 pt-4">
                <a
                  href="#contact"
                  className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg"
                >
                  Get In Touch
                </a>
                <a
                  href="#projects"
                  className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                >
                  View Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - What You Do */}
      <section id="about" className="bluebg border-t min-h-[60vh] w-full  border-white/10">
        <div className="w-full h-screen backdrop-blur-xl p-0 m-0">
          <div className="max-w-7xl  h-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <h2 className="text-4xl  font-bold text-center mb-16">What I Do</h2>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {PORTFOLIO_CONFIG.skills.map((skill, index) => (
              <div
                key={index}
                className="p-8 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all duration-300 transform hover:scale-105 group"
                style={{
                  animation: `fade-in-up 0.6s ease-out ${index * 0.1}s backwards`,
                }}
              >
                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-gray-300 transition">
                  {skill.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="py-20  bg-gradient-to-b from-black to-black/95 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-center mb-16">
            Featured Projects
          </h2>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_CONFIG.projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                
                className="group rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                style={{
                  animation: `fade-in-up 0.6s ease-out ${index * 0.1}s backwards`,
                }}
              >
                {/* Project Image Container */}
                <div className="relative h-48 overflow-hidden bg-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                </div>

                {/* Project Info */}
                <div className="p-6 bg-black/50 group-hover:bg-black/70 transition-all">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gray-300 transition">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-white/10 text-gray-300 rounded-full hover:bg-white/20 transition"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-black border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-center mb-4">
            Let's Work Together
          </h2>

          <p className="text-gray-400 text-center mb-12 text-lg">
            Have a project in mind? Let's chat! Reach out through any channel
            below.
          </p>

          {/* Contact Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Telegram */}
            <a
              href={PORTFOLIO_CONFIG.contact.telegram}
              className="p-6 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all group"
            >
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-bold text-lg mb-2">Telegram</h3>
              <p className="text-gray-400 text-sm mb-4">
                Chat with my AI assistant bot for quick inquiries
              </p>
              <span className="text-white group-hover:translate-x-2 inline-block transition-transform">
                Message Bot →
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${PORTFOLIO_CONFIG.contact.email}`}
              className="p-6 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all group"
            >
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-gray-400 text-sm mb-4">
                {PORTFOLIO_CONFIG.contact.email}
              </p>
              <span className="text-white group-hover:translate-x-2 inline-block transition-transform">
                Send Email →
              </span>
            </a>
          </div>

          {/* Contact Form */}
          <ContactForm />

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-white/10">
            {PORTFOLIO_CONFIG.contact.github && (
              <a
                href={PORTFOLIO_CONFIG.contact.github}
                className="text-gray-400 hover:text-white transition text-sm"
              >
                GitHub
              </a>
            )}
            {PORTFOLIO_CONFIG.contact.linkedin && (
              <a
                href={PORTFOLIO_CONFIG.contact.linkedin}
                className="text-gray-400 hover:text-white transition text-sm"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© 2024 Your Name. All rights reserved.</p>
      </footer>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}

/**
 * CONTACT FORM COMPONENT
 * Allows visitors to send messages via email
 */
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create mailto link with form data
    const mailtoLink = `mailto:${PORTFOLIO_CONFIG.contact.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )}`;

    window.location.href = mailtoLink;

    // Show success feedback
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 border border-white/10 rounded-lg bg-white/5"
    >
      <h3 className="text-2xl font-bold mb-6">Send me a message</h3>

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg focus:border-white/50 focus:outline-none transition text-white placeholder-gray-500"
          placeholder="Your name"
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg focus:border-white/50 focus:outline-none transition text-white placeholder-gray-500"
        />
      </div>

      {/* Message Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Message</label>
        <textarea
          required
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg focus:border-white/50 focus:outline-none transition text-white placeholder-gray-500 h-32 resize-none"
          placeholder="Tell me about your project..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105"
      >
        <Send size={20} />
        Send Message
      </button>

      {/* Success Message */}
      {submitted && (
        <div className="mt-4 p-4 bg-green-900/30 border border-green-700 text-green-200 rounded-lg text-center">
          ✓ Email client opened. Please complete sending the email!
        </div>
      )}
    </form>
  );
}
