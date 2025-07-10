import { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail("");
            // You can add real submit logic here
        }
    };

    return (
        <section className="bg-primary/70   max-w-6xl mx-auto rounded-xl py-20  px-4 md:px-16">
            <h2 className="text-3xl font-bold text-center mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-center mb-8 opacity-80 max-w-xl mx-auto">
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
                <button type="submit" className="btn btn-secondary rounded-box w-full sm:w-auto">
                    {submitted ? "Thank You!" : "Subscribe"}
                </button>
            </form>
        </section>
    );
};

export default Newsletter
