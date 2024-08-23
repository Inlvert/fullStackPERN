import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./pic.png";

const UncontrolledExample = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <div
            style={{
              maxHeight: "500px",
              width: "100%",
            }}
          >
            <img
              src={ExampleCarouselImage}
              alt="ExampleCarouselImage"
              style={{
                objectFit: "cover", // Обрізає зображення, зберігаючи пропорції
                objectPosition: "center bottom",
              }}
            />
          </div>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            style={{
              maxHeight: "500px",
              width: "100%",
            }}
          >
            <img
              src={ExampleCarouselImage}
              alt="ExampleCarouselImage"
              style={{
                objectFit: "cover", // Обрізає зображення, зберігаючи пропорції
                objectPosition: "center bottom",
              }}
            />
          </div>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default UncontrolledExample;
