import React from 'react';
import Banner from '../Component/Banner';
import Testimonial from '../Component/Testimonial';
import BestWorker from '../Component/BestWorker';
import Newsletter from '../Component/Newsletter';

const Home = () => {
    return (
        <div className='space-y-20 mb-10' >
            <Banner/>
            <BestWorker/>
            <Testimonial/>
            <Newsletter/>
        </div>
    );
};

export default Home;