import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Contact = () => {


  return (
    <div className="container mx-auto px-6 py-16">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center mb-4 text-secondary"
      >
        Contact Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
      >
        Have a question, feedback, or want to collaborate? Fill out the form
        below and we’ll get back to you as soon as possible.
      </motion.p>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
       
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-primary/50 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 border border-primary/50 rounded-lg focus:ring-2 focus:ring-secondary outline-none transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 border border-primary/50 rounded-lg focus:ring-2 focus:ring-secondary outline-none transition"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Message</label>
          <textarea
            name="message"
            placeholder="Your message..."
            required
            rows="6"
            className="w-full px-4 py-3 border border-primary/50 rounded-lg focus:ring-2 focus:ring-secondary outline-none transition resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-secondary text-white font-semibold py-3 rounded-lg hover:bg-secondary/70 transition"
        >
          Send Message
        </button>
      </motion.form>
    </div>
  );
};

export default Contact;
