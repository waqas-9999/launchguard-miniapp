import LatestPromotionsCarousel from "./LatestPromotionsCarousel"; // Adjust path as needed
import LiveOrdersPanel from "./LiveOrdersPanel";
import BuyForm from "../BuyForm";
const BuyNow = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Buy Now</h1>

      {/* Latest Promotions Carousel */}
      {/* <LatestPromotionsCarousel /> */}

      {/* Main Content Area */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
         <div>
       
        <LiveOrdersPanel />
      </div>
      {/* Left side - Buy Form */}
     <div className="rounded-xl bg-black/30 backdrop-blur-lg border-0 md:border border-white/10 p-0 md:p-6 h-full flex flex-col">
  {/* Header */}
  <h2 className="text-xl font-semibold text-white mt-6 md:mt-0 md:mb-6">Presale Buy Now</h2>

  {/* Form with top margin */}
  <div className="mt-4">
    <BuyForm />
  </div>
</div>

      {/* Right side - Promotions */}
   
    </div>
    </div>
  );
};

export default BuyNow;
