import React from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
    return (

        <footer className="px-4 divide-y bg-base-300 text-base-content font-semibold">
            {/* Top Section */}
            <div className="container mx-auto py-10  flex flex-col lg:flex-row justify-between items-start space-y-10 lg:space-y-0">

                {/* Logo */}
                <div className="lg:w-1/3 w-full">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">Task Mint<span className="text-primary">.</span></span>
                    </Link>
                </div>

                {/* Links Grid */}
                <div className="lg:w-2/3 w-full grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 text-sm">

                    {/* Links */}
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase">Links</h3>
                        <ul className="space-y-1 flex flex-col">
                            <Link className="hover:text-primary" to="/">Home</Link>
                            {/* Add more links here if needed */}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase">Company</h3>
                        <ul className="space-y-1">
                            <li>
                                <a href="#" className="hover:text-primary">Privacy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary">Terms of Service</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-3 col-span-2 sm:col-span-1">
                        <h3 className="tracking-wide uppercase">Social Media</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-primary" title="Facebook">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="hover:text-primary" title="LinkedIn">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="#" className="hover:text-primary" title="GitHub">
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="py-4 text-sm text-center text-base-content">
                © {new Date().getFullYear()} Task Mint. All rights reserved.
            </div>
        </footer>

    );
};

export default Footer;