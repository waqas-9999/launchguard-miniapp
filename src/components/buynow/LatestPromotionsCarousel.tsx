import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import InviteImg from "../../assets/img/invite.png";
import ZeroFeeImg from "../../assets/img/zero-fee.png";
import ClaimFeeImg from "../../assets/img/claim-fee.png";

const promotions = [
  {
    id: 1,
    image: ZeroFeeImg,
    alt: "Zero Fees Promotion",
  },
  {
    id: 2,
    image: InviteImg,
    alt: "Invite Bonus",
  },
  {
    id: 3,
    image: ClaimFeeImg,
    alt: "Claim Fee Bonus",
  },
];

const LatestPromotionsCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Latest Promotions</h2>
        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
      >
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="min-w-[300px] max-w-[300px] rounded-lg overflow-hidden flex-shrink-0 border border-white/10"
          >
            <img
              src={promo.image}
              alt={promo.alt}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPromotionsCarousel;
