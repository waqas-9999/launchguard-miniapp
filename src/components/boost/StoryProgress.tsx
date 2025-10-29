import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import your images for each story
import BuycexBanner1 from "../../assets/img/home/BuycexBanner.png";
import BuycexBanner5 from "../../assets/img/home/BuycexBanner-5.png";
import BuycexBanner3 from "../../assets/img/home/BuycexBanner-3.png";
import BuycexBanner4 from "../../assets/img/home/BuycexBanner-4.png";

interface StoryProgressProps {
  onClose: () => void;
}

const slides = [
  { id: 1, image: BuycexBanner1 },
  { id: 2, image: BuycexBanner5 },
  { id: 3, image: BuycexBanner3 },
  { id: 4, image: BuycexBanner4 },
];

export default function StoryProgress({ onClose }: StoryProgressProps) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      // On last slide, redirect to /get-bcx
      navigate("/boost");
      onClose();
    }
  };

  const handleLeftButton = () => {
    if (slides[current].id === 3) {
      // Redirect to /dino for slide 3
      navigate("/dino");
    } else if (current === slides.length - 1) {
      // Redirect to /get-bcx for last slide
      navigate("/get-bcx");
    } else {
      // Open website for other slides
      window.open("/landing", "_blank");
    }
  };

  return (
    <div className="fixed w-full h-full max-w-md mx-auto inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Responsive background image */}
      <motion.img
        key={`img-${slides[current].id}`}
        src={slides[current].image}
        alt={`Slide ${slides[current].id}`}
        className="absolute inset-0 w-full h-full object-contain object-center max-w-full max-h-full"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Progress bar */}
      <div className="absolute top-4 left-0 w-full flex justify-between gap-1 px-3 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-gray-700 h-1 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: i <= current ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ))}
      </div>

      {/* Bottom buttons */}
      <div className="absolute bottom-6 w-full max-w-sm mx-auto px-6 z-20 flex gap-4">
        <button
          onClick={handleLeftButton}
          className="bg-[#82ad4b] font-semibold w-1/2 text-black px-6 py-2 rounded-lg"
        >
          {slides[current].id === 3 ? "Play Dino" : current === slides.length - 1 ? "Get BCX" : "Visit website"}
        </button>

        <button
          onClick={handleNext}
          className="bg-white w-1/2 text-black px-6 py-2 rounded-lg font-semibold"
        >
          {current === slides.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
