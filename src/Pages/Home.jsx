import React, { useEffect } from 'react';
import Banner from '../Component/Banner';
import Testimonial from '../Component/Testimonial';
import BestWorker from '../Component/BestWorker';
import Newsletter from '../Component/Newsletter';
import WhyChooseUs from '../Component/WhyChooseUs ';
import HowItWorks from '../Component/HowItWorks';
import Aos from 'aos';

const Home = () => {

    useEffect(() => {
        document.title = "Task Mint - Home";
        Aos.init({ duration: 800 });
    }, []);
    return (
        <div className='space-y-20 mb-10' >
            <Banner />
            <BestWorker />
            <Testimonial />
            <HowItWorks />
            <WhyChooseUs />
            <Newsletter />
        </div>
    );
};

export default Home;