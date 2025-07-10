import React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';






const banner = [
    {
        image: "https://i.postimg.cc/gj6sB1Rx/pexels-cottonbro-4069291.jpg"
    },
    {
        image: "https://i.postimg.cc/W4w0tTmm/pexels-olly-3764178.jpg"
    },
     {
        image: "https://i.postimg.cc/pXKrPkJz/pexels-armin-rimoldi-5553043.jpg"
    }
];

const Banner = () => {
    return (
        <Swiper
            pagination={true}
            autoplay={{ delay: 3000 }}
            modules={[Pagination, Autoplay]}
            className="mySwiper h-[80vh]"
        >
            {banner.map((b) => (
                <SwiperSlide key={b.image}>
                    <div
                        className="h-[80vh]  bg-cover bg-center"
                        style={{ backgroundImage: `url(${b.image})` }}
                    >
                        {/* Optional overlay or content here */}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Banner;
