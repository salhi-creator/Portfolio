import React, { useState } from 'react';
import { X, Send, Mail } from 'lucide-react';

/**
 * MESSAGE POPUP MODAL COMPONENT
 * Standalone reusable contact form modal
 * 
 * Usage:
 * const [showModal, setShowModal] = useState(false);
 * <button onClick={() => setShowModal(true)}>Send Message</button>
 * {showModal && <MessagePopup onClose={() => setShowModal(false)} />}
 */
export function MessagePopup({ onClose, recipientEmail = "hello@example.com" }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending
    setTimeout(() => {
      const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
        formData.subject || 'New Message'
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;

      setLoading(false);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        onClose();
      }, 2000);
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="bg-black border border-white/20 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 scale-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-black/95 backdrop-blur border-b border-white/10 px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Mail size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Send Message</h2>
              <p className="text-xs text-gray-500">We'll get back to you soon</p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {submitted ? (
            // Success State
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-400">Thank you for reaching out. We'll be in touch shortly.</p>
            </div>
          ) : (
            // Form State
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="text-sm font-semibold text-gray-300">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/50 focus:bg-white/10 focus:outline-none transition-all duration-300 text-white placeholder-gray-600"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '50ms' }}>
                <label className="text-sm font-semibold text-gray-300">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/50 focus:bg-white/10 focus:outline-none transition-all duration-300 text-white placeholder-gray-600"
                />
              </div>

              {/* Subject Input */}
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '100ms' }}>
                <label className="text-sm font-semibold text-gray-300">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/50 focus:bg-white/10 focus:outline-none transition-all duration-300 text-white placeholder-gray-600"
                />
              </div>

              {/* Message Input */}
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '150ms' }}>
                <label className="text-sm font-semibold text-gray-300">Message *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="5"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/50 focus:bg-white/10 focus:outline-none transition-all duration-300 text-white placeholder-gray-600 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-in fade-in slide-in-from-bottom-2 duration-300 group"
                style={{ animationDelay: '200ms' }}
              >
                <Send size={20} className={`${loading ? 'animate-spin' : 'group-hover:translate-x-1'} transition-transform duration-300`} />
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {/* Note */}
              <p className="text-xs text-gray-500 text-center pt-2 animate-in fade-in duration-300" style={{ animationDelay: '250ms' }}>
                Opens your default email client to send the message
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoom-in-95 {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in-from-bottom-2 {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .fade-in {
          animation-name: fade-in;
        }

        .zoom-in-95 {
          animation-name: zoom-in-95;
        }

        .slide-in-from-bottom-2 {
          animation-name: slide-in-from-bottom-2;
        }

        .duration-300 {
          animation-duration: 300ms;
        }

        .duration-500 {
          animation-duration: 500ms;
        }
      `}</style>
    </div>
  );
}

/**
 * EXAMPLE USAGE IN YOUR PORTFOLIO
 * ================================
 * 
 * In your portfolio component:
 * 
 * import { MessagePopup } from './MessagePopup';
 * 
 * export default function Portfolio() {
 *   const [showMessageModal, setShowMessageModal] = useState(false);
 * 
 *   return (
 *     <>
 *       {/* Your portfolio content }*/


/**
 * PROPS:
 * - onClose: Function to call when closing modal (required)
 * - recipientEmail: Email to receive messages (default: "hello@example.com")
 */
