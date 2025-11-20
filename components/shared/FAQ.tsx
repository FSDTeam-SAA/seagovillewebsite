"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CircleMinus,
  CirclePlus,
  Minus,
} from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Absolutely! You can upgrade or downgrade your plan at any time. Changes to your plan will be reflected in your next billing cycle.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel your subscription at any time. There are no cancellation fees, and you'll continue to have access to your plan until the end of your current billing period.",
    },
    {
      question: "Can other info be added to an invoice?",
      answer:
        "Yes, you can add custom fields to your invoices including tax information, purchase orders, additional notes, and company details to meet your accounting needs.",
    },
    {
      question: "How does billing work?",
      answer:
        "We offer monthly and annual billing cycles. All payments are processed securely through our payment partners. You'll receive email notifications for upcoming payments and can download invoices from your account dashboard.",
    },
    {
      question: "How do I change my account email?",
      answer:
        "You can update your account email from the settings page in your dashboard. We'll send a verification email to your new address to confirm the change.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header Section */}
        <div className="text-center  mx-auto mb-16">
          <p className="text-sm font-medium text-[#D62828] bg-[#F2BCBC] border py-2 px-4 rounded-sm  inline-block border-[#F2BCBC]  tracking-wider leading-[150%]">
            {" "}
            🤔 FAQs
          </p>
          <h2 className="text-xl md:text-[32px] text-secondary font-bold tracking-tight mb-4 font-lobster">
            Frequently asked questions
          </h2>
          <p className="text-xs md:text-sm text-gray ">
            Here are the most common questions our customers ask with quiet and
            helpful answers to guide your ordering experience.
          </p>
        </div>

        {/* FAQ Items */}
        <div className=" mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border-b border-border  bg-card hover:bg-accent/5 transition-colors cursor-pointer"
              onClick={() => toggleItem(index)}
            >
              <div className="flex items-center justify-between p-6">
                <h3 className="text-sm md:text-lg text-secondary font-semibold text-left pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <CircleMinus className="h-5 w-5 shrink-0  text-primary" />
                ) : (
                  <CirclePlus className="h-5 w-5 shrink-0 text-primary" />
                )}
              </div>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray text-xs md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        {/* <div className="text-center mt-16 max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-6">
            Still have questions? We&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
              Schedule a Call
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FAQ;
