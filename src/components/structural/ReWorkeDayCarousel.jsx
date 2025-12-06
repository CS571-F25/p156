import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

export default function ReWorkeDayCarousel(props) {
    const [loadedImages, setLoadedImages] = useState({});
    const jobImgs = ["welder", "consultants", "astronaut", "refs", "teacher", "waiter"]
    const alts = ["a person is wearing a welding mask and perfoming a small weld with blue sparks coming off the work in a factory", "two consultants male and female walking down a street", "astronaut in white helment with earth behind them", "a group of referees standing in a snowy football field smiling for the camera", "a teacher pointing to writing on the chalkboard with a small group of young children", "a waiter holding a plater is smiling and guiding the POV to a seat in a dim lit restaurant"]
    // Preload images and mark them as loaded

    useEffect(() => {
        jobImgs.forEach((name, i) => {
            const img = new Image();
            img.src = `/p156/carousel/${name}.png`;
            img.onload = () => {
                setLoadedImages(prev => ({ ...prev, [name]: true }));
            };
        });
    }, [jobImgs]);
    
    return (
<Carousel interval={6700} controls={false} indicators={false} fade keyboard={false} className="pt-3">
  {jobImgs.map((name, i) => (
    <Carousel.Item key={name}>
      <div
        style={{
          width: "22rem",
          height: "22rem",
          margin: "auto",
          overflow: "hidden",
          borderRadius: "100rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={`/p156/carousel/${name}.png`}
          alt={alts[i]}
          width="22rem"
          height="22rem"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "100rem",
            transition: "opacity .4s ease",
          }}
        />
      </div>
    </Carousel.Item>
  ))}
</Carousel>


        );
}
