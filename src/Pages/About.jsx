import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center mb-6 text-secondary"
      >
        About Task Mint
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg text-center max-w-3xl mx-auto text-gray-600 mb-16"
      >
        Task Mint is a next-generation micro-tasking platform where you can
        <span className="text-secondary font-semibold"> earn rewards</span>,{" "}
        <span className="text-secondary font-semibold">learn digital skills</span>, 
        and <span className="text-secondary font-semibold">grow with community</span>.  
        We believe small tasks can create big opportunities.
      </motion.p>

      {/* Info Section */}
      <div className="grid md:grid-cols-3 gap-10">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl shadow-lg hover:shadow-2xl bg-white border border-primary/50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 transition"
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">🚀 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to <span className="font-semibold">empower individuals</span> 
            by offering easy-to-complete micro-tasks that not only generate income 
            but also enhance technical knowledge and real-world digital skills.  
            We want to make earning accessible for everyone.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-8 rounded-2xl shadow-lg hover:shadow-2xl bg-white border border-primary/50 hover:bg-gradient-to-br hover:from-secondary/10 hover:to-primary/10 transition"
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">💡 Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a <span className="font-semibold">global community</span> 
            where anyone, regardless of background, can earn online, 
            learn new skills, and improve their career prospects.  
            Task Mint will be a bridge between <span className="font-semibold">earning & learning</span>.
          </p>
        </motion.div>

        {/* Developer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="p-8 rounded-2xl shadow-lg hover:shadow-2xl bg-white border border-primary/50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 transition"
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">👨‍💻 Join as Developer</h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            Task Mint is open-source, meaning developers around the world can 
            collaborate, contribute features, fix bugs, and make the platform 
            better. This is your chance to <span className="font-semibold">grow as a developer</span> 
            while impacting thousands of users.
          </p>
          <a
            href="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-SazidSifat"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary/70 transition"
          >
            Contribute Now
          </a>
        </motion.div>
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-16 text-center text-gray-600"
      >
        <p>
          🌱 Task Mint is not just a platform – it’s a{" "}
          <span className="font-semibold text-secondary">community</span> where
          every small contribution matters.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
