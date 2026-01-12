import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="pt-32 min-h-screen bg-ink text-paper px-6 pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div>
          <h1 className="font-display text-5xl md:text-7xl mb-8">Start a Project</h1>
          <p className="text-paper/60 text-lg mb-12 max-w-md">
            Interested in working together? We should queue up a chat. I’ll buy the coffee.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-paper/10 rounded-full text-gold">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Tokyo Office</h3>
                <p className="text-paper/60">Shibuya District, Tokyo<br/>150-0002, Japan</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-paper/10 rounded-full text-gold">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Inquiries</h3>
                <p className="text-paper/60">hello@msru.design</p>
              </div>
            </div>
          </div>

          {/* Simple Map Placeholder */}
          <div className="mt-12 w-full h-64 bg-charcoal rounded-lg border border-paper/10 flex items-center justify-center">
            <span className="text-paper/20 font-display">MAP VIEW</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-paper text-ink p-8 md:p-12 rounded-2xl shadow-2xl">
          {formStatus === 'success' ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="h-full flex flex-col items-center justify-center text-center py-20"
             >
               <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                 <Send size={40} />
               </div>
               <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
               <p className="text-ink/60">We'll get back to you within 24 hours.</p>
               <button onClick={() => setFormStatus('idle')} className="mt-8 text-cinnabar underline">Send another</button>
             </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">Name</label>
                <input required type="text" className="w-full bg-paper border-b-2 border-ink/20 p-3 focus:outline-none focus:border-cinnabar transition-colors" placeholder="John Doe" />
              </div>
              
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">Email</label>
                <input required type="email" className="w-full bg-paper border-b-2 border-ink/20 p-3 focus:outline-none focus:border-cinnabar transition-colors" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">Inquiry Type</label>
                <select className="w-full bg-paper border-b-2 border-ink/20 p-3 focus:outline-none focus:border-cinnabar transition-colors">
                  <option>Business</option>
                  <option>Career</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">Message</label>
                <textarea required rows={5} className="w-full bg-paper border-b-2 border-ink/20 p-3 focus:outline-none focus:border-cinnabar transition-colors" placeholder="Tell us about your project..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className="w-full bg-ink text-paper py-4 mt-4 font-bold tracking-widest hover:bg-cinnabar transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {formStatus === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;