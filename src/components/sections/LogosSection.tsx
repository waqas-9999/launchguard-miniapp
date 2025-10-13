import CoinMarketCap from "../../assets/svg/coin-market-cap.svg";
import Solidity from "../../assets/svg/solidity.svg";
import YahooFinance from "../../assets/svg/yahoo-finance.svg";
import Binance from "../../assets/svg/binance.svg";
import Polygon from "../../assets/svg/polygon.svg";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import FadeInBlur from "../animations/FadeInBlur";

const LogosSection = () => {
  const logos = [
    {
      img: CoinMarketCap,
      alt: "CoinMarketCap",
      link: "https://coinmarketcap.com/",
    },
    {
      img: Solidity,
      alt: "Solidity",
      link: "https://soliditylang.org/",
    },
    {
      img: YahooFinance,
      alt: "Yahoo Finance",
      link: "https://finance.yahoo.com/",
    },
    {
      img: Binance,
      alt: "Binance",
      link: "https://www.binance.com/en",
    },
    {
      img: Polygon,
      alt: "Polygon",
      link: "https://polygon.technology/",
    },
  ];
  return (
    <section>
      <div className="container">
        <div className="h-px bg-gradient-to-r from-white/0 to-white/20" />
        <FadeInBlur className="py-12">
          <Swiper
            spaceBetween={32}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: "auto",
              },
            }}
            freeMode={true}
            autoplay={{ delay: 3000 }}
          >
            {logos.map((logo, index) => (
              <SwiperSlide key={index} className="lg:!w-auto">
                <a
                  key={index}
                  href={logo.link}
                  target="_blank"
                  className="flex items-center justify-center hover:opacity-80"
                >
                  <img
                    src={logo.img}
                    alt={logo.alt}
                    className="h-auto max-w-full lg:h-12"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeInBlur>
        <div className="h-px bg-gradient-to-r from-white/20 to-white/0" />
      </div>
    </section>
  );
};

export default LogosSection;
