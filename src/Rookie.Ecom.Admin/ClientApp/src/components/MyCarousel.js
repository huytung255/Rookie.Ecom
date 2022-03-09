import React from "react";
import {
  Carousel,
  CarouselIndicators,
  CarouselControl,
  CarouselItem,
} from "reactstrap";
const MyCarousel = ({ items, defaultItem }) => {
  // State for Active index
  const [activeIndex, setActiveIndex] = React.useState(0);

  // State for Animation
  const [animating, setAnimating] = React.useState(false);
  // Items array length
  const itemLength = items.length - 1;
  // Previous button for Carousel
  const previousButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  // Next button for Carousel
  const nextButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  // Carousel Item Data
  const carouselItemData = () => {
    const itemsWithDefault = items.filter((item) => item.id !== defaultItem.id);
    itemsWithDefault.unshift(defaultItem);
    return itemsWithDefault.map((item) => (
      <CarouselItem
        key={item.imageUrl}
        onExited={() => setAnimating(false)}
        onExiting={() => setAnimating(true)}
      >
        <img
          src={item.imageUrl}
          alt={item.caption}
          className="img-fluid rounded"
        />
      </CarouselItem>
    ));
  };
  return (
    <Carousel
      previous={previousButton}
      next={nextButton}
      activeIndex={activeIndex}
      interval={3500}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={(newIndex) => {
          if (animating) return;
          setActiveIndex(newIndex);
        }}
      />
      {carouselItemData()}
      <CarouselControl
        directionText="Prev"
        direction="prev"
        onClickHandler={previousButton}
      />
      <CarouselControl
        directionText="Next"
        direction="next"
        onClickHandler={nextButton}
      />
    </Carousel>
  );
};

export default MyCarousel;
