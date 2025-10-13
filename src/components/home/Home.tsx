// components/home/Home.tsx
import Navbar from "../Navbar";

import HeaderSection from "../sections/HeaderSection";
import LogosSection from "../sections//LogosSection";
import HowToBuySection from "../sections/HowToBuySection";
import RoadmapSection from "../sections/RoadmapSection";
import SecurityAuditSection from "../sections/SecurityAuditSection";
import TokenomicsSection from "../sections/TokenomicsSection";
import StatsSection from "../sections/StatsSection";
import TeamSection from "../sections/TeamSection";
import Footer from "../Footer";
import PowerBy from "../powered-by/Power-By";
import BCXDistribution from "../sections/BcxDistribution";
import CommunitySection from "../sections/CommunitySection";
import AboutUsSection from "../sections/AboutUsSection";
import FAQ from "../FAQ/FAQ";
import faqIcon from "../../assets/img/icon_faq.svg";

const Home = () => {
  const faqs = [
    // General
    {
      topic: "General",
      question: "What is Buycex?",
      answer:
        "BuyCex is a next-generation cryptocurrency exchange built on its proprietary hybrid blockchain (EVM + Cosmos SDK), where the community holds true ownership through the BCX Coin. Unlike traditional exchanges, 100% of ownership is represented by BCX, meaning every holder is a real partner—sharing in profit, participating in governance, and benefiting directly from the platform’s growth and buyback model.",
      icon: faqIcon,
    },
    {
      topic: "General",
      question: "Is Buycex secure?",
      answer:
        "Security and transparency are foundational to BuyCex. The platform utilizes independent smart contract audits, multi-signature treasury protection, and both hot/cold wallet segregation for custodial safety. All critical systems are audited by industry leaders (such as CertiK, Hacken, SlowMist, and Quantstamp), and regular transparency reports ensure that users can independently verify revenues, reserves, and token burns in real time.",
      icon: faqIcon,
    },
    {
      topic: "General",
      question: "How do I create an account on Buycex?",
      answer:
        "To create an account, visit the BuyCex platform and use the sign-up function to register with your email and a secure password. After registration, you may be required to complete KYC (Know Your Customer) verification if legally mandated, ensuring compliance and user protection. Once verified, your account is ready to access BuyCex’s wide range of trading and ownership features.",
      icon: faqIcon,
    },
    {
      topic: "General",
      question: "Are there any fees for using Buycex?",
      answer:
        "BuyCex is committed to maintaining the lowest trading fee structure in the industry, with no hidden charges or inflationary practices. Every aspect of the fee and profit distribution model is fully visible on-chain, and users benefit from reduced costs as well as direct profit sharing through BCX buyback and burn events.",
      icon: faqIcon,
    },
    
  
    // Presale
    {
      topic: "Presale",
      question: "How can I participate in the presale?",
      answer:
        "To participate in the BCX presale, connect your wallet to the official BuyCex presale platform. Next, choose your preferred payment currency from USDT, USDC, ETH, BNB, or BTC, and enter the amount of BCX tokens you want to purchase. Follow the on-screen instructions to complete the transaction. After the presale ends, your BCX tokens will be distributed to your connected wallet.",
      icon: faqIcon,
    },
    {
      topic: "Presale",
      question: "Are there any bonuses for early participants?",
      answer:
        "Instead of traditional bonuses or airdrops, early participants benefit from significantly lower token prices during the initial presale phases. This tiered pricing structure is the core incentive for early buyers, encouraging timely participation.",
      icon: faqIcon,
    },
    {
      topic: "Presale",
      question: "How do I connect my wallet to participate?",
      answer:
"To participate in the BCX presale, click the “Connect Wallet” button on the platform, then choose wallet as your connection method. After selecting your wallet, follow the on-screen instructions—on desktop, you’ll approve via the browser extension; on mobile, scan the QR code using your MetaMask or Trust Wallet app to link securely. Once connected, you’ll be able to proceed with your BCX token purchase.",
      icon: faqIcon,
    },
    {
      topic: "Presale",
      question: "When will I receive the BCX tokens I purchase?",
      answer:
        "After the presale concludes, BCX tokens will be distributed automatically to your connected wallet. You will receive tokens in line with the presale’s vesting and allocation rules.",
      icon: faqIcon,
    },
    
  
    // Dashboard
    {
      topic: "Dashboard",
      question: "How do I access my dashboard?",
      answer:
        "Log in to your Buycex account, and you will be redirected to your dashboard, where you can manage your transactions and account settings.",
      icon: faqIcon,
    },
    {
      topic: "Dashboard",
      question: "Can I customize my dashboard view?",
      answer:
        "Yes, you can customize your dashboard by choosing different layouts, widgets, and themes to personalize your Buycex experience.",
      icon: faqIcon,
    },
    {
      topic: "Dashboard",
      question: "What information is available on the dashboard?",
      answer:
        "The dashboard provides an overview of your transactions, account balance, recent activities, and important notifications to keep you updated.",
      icon: faqIcon,
    },
    {
      topic: "Dashboard",
      question: "How do I update my account details on the dashboard?",
      answer:
        "To update your account details, go to the dashboard settings and click on 'Account Information'. Make the necessary changes and save your updates.",
      icon: faqIcon,
    },
  ];
  return (
    <>
      <Navbar />
      <main id="main" className="flex flex-col">
        <HeaderSection />
        <div id="about-us">
          <AboutUsSection />
        </div>
        <div id="how-to-buy">
          <HowToBuySection />
        </div>
                <div id="tokenomics">
          <BCXDistribution />
        </div>
        <TokenomicsSection />
        <div id="roadmap">
          <RoadmapSection />
        </div>
        <div>
          <SecurityAuditSection />
        </div>
        <div id="community">
          <CommunitySection />
        </div>
        {/* <TokenomicsSection /> */}
        
        <div className="relative z-10 text-center space-y-8 sm:space-y-10 px-4 sm:px-6 lg:px-0">
            <div className="mt-8 sm:mt-12 lg:mt-16">
              <FAQ faqs={faqs} lightMode={false} />
            </div>
          </div>
        {/* <div id="team">
          <StatsSection />
        </div> */}
        <Footer />
      </main>
    </>
  );
};

export default Home;
