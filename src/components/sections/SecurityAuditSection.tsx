import React from "react";
import HeaderLabel from "../HeaderLabel/HeaderLabel";
import "./SecurityAuditSection.css";

const SecurityAuditSection = () => {
  const auditCards = [
    {
      id: 1,
      title: "Internal Audit",
      status: "Completed",
      description: "Our in-house team conducted an exhaustive review using advanced code analysis tools, extensive unit tests, and integration tests to identify and address potential vulnerabilities.",
      icon: (
        <div className="relative audit-icon">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#efb81c] to-[#f4c84a] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-[#efb81c]/25">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#efb81c]/80 to-[#f4c84a]/80 rounded-lg sm:rounded-xl flex items-center justify-center">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-[#efb81c]/60 to-[#f4c84a]/60 rounded-md sm:rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#efb81c]/40 to-[#f4c84a]/40 rounded-sm sm:rounded-md"></div>
              </div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-400 rounded-full flex items-center justify-center">
            <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      ),
      iconType: "internal"
    },
    {
      id: 2,
      title: "External Audit 1: Halborn",
      status: "Completed",
      description: "We partnered with Halborn, a renowned security firm, to provide an independent assessment. Their review validated our internal findings and helped fortify our security measures.",
      icon: (
        <div className="relative audit-icon">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#efb81c] to-[#f4c84a] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-[#efb81c]/25">
            <div className="text-center">
              <div className="text-sm sm:text-xl font-bold text-black mb-1 tracking-wider">HALBORN</div>
              <div className="text-xs text-black/70">Click on above logo to read</div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-400 rounded-full flex items-center justify-center">
            <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      ),
      iconType: "halborn"
    },
    {
      id: 3,
      title: "External Audit 2: Certik",
      status: "Completed",
      description: "We are currently collaborating with Certik for an additional layer of scrutiny to further enhance our smart contract security.",
      icon: (
        <div className="relative audit-icon">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#efb81c] to-[#f4c84a] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-[#efb81c]/25">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                <div className="w-5 h-5 sm:w-7 sm:h-7 bg-black rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm sm:text-xl font-bold text-black">CERTIK</span>
              </div>
              <div className="text-xs text-black/70">Click on above logo to read</div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-400 rounded-full flex items-center justify-center">
            <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      ),
      iconType: "certik"
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-24 bg-black relative overflow-hidden security-audit-section px-4 sm:px-6 lg:px-0">
      {/* Background Decorative Elements removed */}

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#efb81c] rounded-full"></div>
            <div className="w-6 sm:w-8 h-0.5 bg-[#efb81c]"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#efb81c] rounded-full"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#efb81c] mb-4 sm:mb-6 lg:mb-8">
            Fortifying Blockchain Security at Every Layer
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-5xl mx-auto leading-relaxed px-2 sm:px-0">
            BuyCex places security at the heart of innovation, implementing rigorous audits, 
            community-driven bug bounty programs, and advanced cryptographic solutions. Discover 
            how our proactive approach ensures a secure, transparent, and resilient blockchain ecosystem.
          </p>
        </div>

        {/* Audit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {auditCards.map((card, index) => (
            <div
              key={card.id}
              className="group bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative"
            >
              {/* Hover Glow Effect removed */}
              
              {/* Card Content Wrapper */}
              <div className="relative z-10">
                {/* Card Header */}
                <div className="p-4 sm:p-6 lg:p-8 border-b border-white/20">
                  
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                    {card.title}
                  </h3>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {card.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                  <button className="w-full bg-gradient-to-r from-[#efb81c]/20 to-[#efb81c]/10 text-[#efb81c] font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl border border-[#efb81c]/30 text-sm sm:text-base">
                    Read Full Report
                  </button>
                </div>
              </div>

              {/* Bottom Accent Line removed */}
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <button className="group relative bg-gradient-to-r from-[#efb81c] via-[#f4c84a] to-[#efb81c] text-black font-bold py-2.5 sm:py-3 px-6 sm:px-10 rounded-full text-base sm:text-xl shadow-2xl">
            <span className="relative z-10 text-sm sm:text-base">Explore Our Security Commitment</span>
            
            {/* Button Glow Effect removed */}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SecurityAuditSection; 