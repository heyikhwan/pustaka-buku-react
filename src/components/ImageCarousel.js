import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function ImageCarousel({ images, title }) {
  return (
    <>
      <Carousel autoPlay={true} infiniteLoop={true}>
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={`http://127.0.0.1:8000/storage/${image.image}`}
              alt={title}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
}
