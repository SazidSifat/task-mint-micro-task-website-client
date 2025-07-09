import React from 'react';

import loading from '../assets/animation/loading.json'
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <div className='min-h-[90vh] flex items-center justify-center'>

            <Lottie animationData={loading} className='w-72'></Lottie>


        </div>
    );
};

export default Loading;