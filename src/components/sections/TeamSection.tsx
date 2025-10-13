import { ReactComponent as TwitterIcon } from "../../assets/svg/twitter.svg";
import { ReactComponent as TelegramIcon } from "../../assets/svg/telegram.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/svg/linkedin.svg";
import Thomas from "../../assets/img/thomas.png";
import Yan from "../../assets/img/yan.png";
import Richard from "../../assets/img/richard.png";
import Ahmed from "../../assets/img/ahmed.png";
import FadeUp from "../animations/FadeUp";
import FadeLeft from "../animations/FadeLeft";

const TeamSection = () => {
  const team = [
    {
      name: "User 1",
      role: "CEO, Founder",
      img: Thomas,
      linkedin: undefined,
      twitter: undefined,
      telegram: "https://t.me/",
    },
    {
      name: "User 2",
      role: "CEO, Founder",
      img: Yan,
      linkedin: undefined,
      twitter: undefined,
      telegram: "https://t.me/",
    },
    {
      name: "User 3",
      role: "Lead UI/UX Designer",
      img: Richard,
      linkedin: undefined,
      twitter: undefined,
      telegram: "https://t.me",
    },
    {
      name: "User 4",
      role: "Full Stack Developer",
      img: Ahmed,
      linkedin: undefined,
      twitter: undefined,
      telegram: "https://t.me/",
    },
  ];
  return (
    <section id="team" className="pb-12 lg:pb-24">
      <div className="container px-4 lg:px-0">
        <FadeLeft>
          <h2 className="text-gradient mb-6 text-center text-5xl leading-normal lg:mb-12 lg:text-left">
            Team
          </h2>
        </FadeLeft>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((item, i) => (
            <FadeUp delay={i * 0.7} key={i}>
              <div className="group flex flex-col items-center justify-center rounded-2xl border-2 border-white/20 bg-[#14181C]/30 backdrop-blur-3xl transition-all duration-200 hover:scale-105 hover:border-[#3e1f5e]">
                <div className="py-10 px-6 text-center">
                  <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full bg-white/10">
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-auto max-w-full"
                      />
                    )}
                  </div>
                  <h4 className="mb-1 text-2xl font-semibold">{item.name}</h4>
                  <p className="text-lg text-[#3D3F4F]">{item.role}</p>
                </div>
                <div className="h-px w-full bg-white/20 transition-all duration-200 group-hover:bg-[#3e1f5e]"></div>
                <div className="flex justify-center gap-4 px-6 py-4 text-white/20">
                  {item.linkedin && (
                    <a
                      href={item.linkedin}
                      target="_blank"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#3D3F4F]/40 transition-all duration-200 hover:bg-primary hover:text-black/70"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  )}
                  {item.twitter && (
                    <a
                      href={item.twitter}
                      target="_blank"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#3D3F4F]/40 transition-all duration-200 hover:bg-primary hover:text-black/70"
                    >
                      <TwitterIcon className="h-5 w-5" />
                    </a>
                  )}
                  {item.telegram && (
                    <a
                      href={item.telegram}
                      target="_blank"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#3D3F4F]/40 transition-all duration-200 hover:bg-primary hover:text-black/70"
                    >
                      <TelegramIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
