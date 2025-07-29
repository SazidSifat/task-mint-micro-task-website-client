import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
    {
        name: "Samantha Lee",
        quote: "This platform has completely changed the way I learn and grow.",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "John Doe",
        quote: "Outstanding experience with helpful support team, truly made learning easy.",
        photo: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
        name: "Emily Johnson",
        quote: "I highly recommend this platform for anyone wanting to level up skills.",
        photo: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        name: "Michael Smith",
        quote: "Great UI and tons of valuable content, absolutely a perfect platform.",
        photo: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    {
        name: "Rachel Adams",
        quote: "One of the best learning platforms I have ever used regularly.",
        photo: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
        name: "Chris Evans",
        quote: "Very smooth experience here, I will definitely use it again soon.",
        photo: "https://randomuser.me/api/portraits/men/31.jpg",
    },
];

const Testimonial = () => {
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    return (
        <section
            className="bg-base-100 container mx-auto text-base-content py-14 px-4 md:px-16"
            data-aos="fade-up"
        >
            <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>

            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="p-6 bg-base-200 rounded-box shadow hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-center">
                            <img
                                src={testimonial.photo}
                                alt={testimonial.name}
                                className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-primary object-cover"
                            />
                            <p className="text-base-content opacity-80 italic mb-4">"{testimonial.quote}"</p>
                            <h3 className="text-lg font-semibold text-primary">{testimonial.name}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonial;
