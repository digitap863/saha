"use client";

import React, { createContext, useContext, useState } from "react";
import EnquiryModal from "@/components/common/EnquiryModal";

interface EnquiryContextType {
  isOpen: boolean;
  openEnquire: () => void;
  closeEnquire: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openEnquire = () => setIsOpen(true);
  const closeEnquire = () => setIsOpen(false);

  return (
    <EnquiryContext.Provider value={{ isOpen, openEnquire, closeEnquire }}>
      {children}
      <EnquiryModal isOpen={isOpen} onClose={closeEnquire} />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry(): EnquiryContextType {
  const context = useContext(EnquiryContext);
  if (!context) {
    return {
      isOpen: false,
      openEnquire: () => {},
      closeEnquire: () => {},
    };
  }
  return context;
}

