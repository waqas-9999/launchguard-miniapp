import React, { useState } from "react";
import "./FAQ.css";

interface FAQItem {
  topic: string;
  question: string;
  answer: string;
  icon: string;
}

interface FAQProps {
  faqs: FAQItem[];
  lightMode: boolean;
}

const FAQ: React.FC<FAQProps> = ({ faqs, lightMode }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>("General");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const filterTopics = ["General", "Presale", "Dashboard"];

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="faq__container max-w-5xl mx-auto pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="faq__header text-center mb-8 sm:mb-12 lg:mb-16">
        <div className="faq__header-decoration mb-4 sm:mb-6">
          <div className="faq__decoration-dot"></div>
          <div className="faq__decoration-line"></div>
          <div className="faq__decoration-dot"></div>
        </div>

        <h2 className="faq__title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6">
          Frequently Asked Questions
        </h2>

        <p className="faq__subtitle text-sm sm:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto px-2 sm:px-0">
          Find answers to common questions about BuyCex, our presale, and everything you need to know to get started.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="faq__filters mb-8 sm:mb-12 lg:mb-16">
        {filterTopics.map((topic) => (
          <button
            key={topic}
            className={`faq__filter-button ${selectedTopic === topic ? "selected" : ""}`}
            onClick={() => handleTopicClick(topic)}
          >
            <div className="faq__filter-content">
              <span className="faq__filter-text">{topic}</span>
            </div>
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="faq__items">
        {faqs
          .filter((faq) => faq.topic === selectedTopic)
          .map((faq, index) => (
            <div key={index} className="faq__item">
              <div
                className={`faq__question ${openFAQ === index ? "faq__question--open" : ""} ${lightMode ? "light" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                {/* Question */}
                <div className="faq__question-header flex justify-between items-center">
                  <div className="faq__question-content">
                    <p className="faq__question-text text-lg sm:text-2xl font-semibold text-start">{faq.question}</p>
                  </div>

                  {/* Arrow (static, no animation) */}
                  <div className="faq__arrow">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Answer (static, no animation) */}
                {openFAQ === index && (
                  <div className="faq__answer">
                    <div className="faq__answer-content">
                      <p className="faq__answer-text">{faq.answer}</p>
                      <div className="faq__answer-decoration">
                        <div className="faq__answer-dot"></div>
                        <div className="faq__answer-dot"></div>
                        <div className="faq__answer-dot"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FAQ;
