const ImageCarousel = ({ images }) => {
  return (
    <>
      {images.map((src, index) => (
        <img
          key={index}
          src={`../src/images${src}`}
          className="object-cover rounded-lg shadow-md snap-start"
          alt={`Gallery ${index + 1}`}
          sizes="cover"
        />
      ))}
    </>
  );
};

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";

// const ImageCarousel = ({ images }) => {
//   return (
//     <Swiper
//       navigation={true}
//       modules={[Navigation]}
//       className="w-full h-[300px] sm:h-[400px] lg:h-[500px]"
//     >
//       {images.map((img, index) => (
//         <SwiperSlide key={index}>
//           <img
//             src={`../src/images${img}`}
//             alt={`House image ${index + 1}`}
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

export default ImageCarousel;
