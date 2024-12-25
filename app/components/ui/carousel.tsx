import React, { useState, useCallback } from 'react';

interface CustomCarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
}

const Carousel: React.FC<CustomCarouselProps> = ({ 
  children,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = React.Children.count(children);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  return (
    <div className="custom-carousel">
      <div className="relative overflow-hidden">
        <div 
          className="carousel-inner flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div key={index} className="carousel-item flex-shrink-0 w-full flex items-center justify-center">
              {child}
            </div>
          ))}
        </div>
        
        <button 
          onClick={prevSlide} 
          className="carousel-control left-2 top-1/2 transform -translate-y-1/2 absolute bg-white bg-opacity-50 p-2 rounded-full"
        >
          &#8249;
        </button>
        <button 
          onClick={nextSlide} 
          className="carousel-control right-2 top-1/2 transform -translate-y-1/2 absolute bg-white bg-opacity-50 p-2 rounded-full"
        >
          &#8250;
        </button>
      </div>
      
      <div className="carousel-indicators flex justify-center space-x-2 mt-4">
        {React.Children.map(children, (_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
