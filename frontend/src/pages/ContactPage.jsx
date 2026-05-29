import { useState,useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import {getProfile} from "../services/api";


const ContactPage=()=>{
    const formRef=useRef();
    const [formData,setFormData]=useState({
        from_name:"",
        from_email:"",
        messages:"",
    });

    const [loading,setLoading]=useState(false);
    const [profile, setProfile]=useState(null);
    

    // Email and phone fetch from Profile
    useEffect(()=>{
        getProfile()
        .then(res=>setProfile(res.data))
        .catch(err=>console.log(err));
    },[]);

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});
    };

    const handleSubmit =async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            toast.success("Message sent!");
            setFormData({from_name:"",form_email:"",messages:''});
        }catch(err){
            toast.error('Message not sent - try again!');
            console.log(err);
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="min-h-screen bg-[#0d0d1a] pt-24 px-6 pb-16">

      {/* Background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-purple-400 text-sm font-medium mb-3 uppercase tracking-widest">Contact</p>
          <h1 className="text-5xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Got a project? Let's talk—the reply will be in 24 Horses!
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left — Info */}
          <div className="space-y-6">

            <div className="bg-[#13132a] border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Let's Connect 🤝</h2>

              <div className="space-y-5">
                {/* email -profile */}
                {profile?.email &&(
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    📧
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Email</p>
                    <a href={`mailto:${profile.email}`} className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                        {profile.email}
                        </a>
                  </div>
                </div>
                )}
                  {/* Phone -profile */}
                  {profile?.phone &&(
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    📱
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Phone</p>
                   <a href={`tel:$[profile.phone]`} className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
                    {profile.phone}
                   </a>
                  </div>
                </div>
                  )}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Location</p>
                    <p className="text-gray-400 text-sm">India</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10 my-6" />

              {/* Response time */}
              <div className="flex items-center gap-3 p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                <p className="text-green-400 text-sm">Available - I will reply in 24 hours</p>
              </div>
            </div>

          </div>

          {/* Right — Form */}
          <div className="bg-[#13132a] border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Send Message </h2>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Your Name *</label>
                <input
                  type="text"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  required
                  className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Your Email *</label>
                <input
                  type="email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  required
                  className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your Message..."
                  required
                  rows={5}
                  minLength={10}
                  className="w-full px-4 py-3 bg-[#1a1a35] border border-purple-900/40 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-all duration-200 text-sm resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 text-base"
              >
                {loading ? 'Sending...' : 'Send Message '}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};


export default ContactPage;