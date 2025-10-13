import FadeUp from "../animations/FadeUp";

const StatsSection = () => {
  const stats = [
    {
      title: "Total Holder",
      value: "1000",
    },
    {
      title: "Total Transactions",
      value: "1110",
    },
    {
      title: "Market Cap",
      value: "83,63 B+",
    },
    {
      title: "Daily Volume",
      value: "1,6 B",
    },
  ];
  return (
    <section className="px-4 sm:px-6 lg:px-0">
      <div className="container">
        <div className="h-px bg-gradient-to-r from-white/0 to-white/20" />
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <FadeUp delay={i * 0.7} key={i} className="text-center">
                <h2 className="text-gradient mb-3 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {stat.value}
                </h2>
                <h4 className="text-sm sm:text-base lg:text-xl font-medium text-white/80">{stat.title}</h4>
              </FadeUp>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-white/20 to-white/0" />
      </div>
    </section>
  );
};

export default StatsSection;
