import { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => setSubmitted(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [submitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            // Add real API call logic here if needed
            setSubmitted(true);
            setEmail("");
        }
    };

    return (
        <section
            className="bg-primary/70 text-primary-content max-w-6xl mx-auto rounded-xl py-20 px-4 md:px-16"
            data-aos="fade-up"
        >
            <h2 className="text-3xl font-bold text-center mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-center mb-8 opacity-90 max-w-xl mx-auto">
                Stay updated with the latest news and offers. We promise not to spam!
            </p>

            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-4"
            >
                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full sm:flex-1 text-base-content rounded-box"
                />
                <button
                    type="submit"
                    className={`btn btn-secondary rounded-box w-full sm:w-auto transition-all duration-300 ${submitted && "btn-success"}`}
                >
                    {submitted ? "Thank You!" : "Subscribe"}
                </button>
            </form>
        </section>
    );
};

export default Newsletter;
