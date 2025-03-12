"use client";

import BrandLogo from "@/components/brand-logo";
import UserAddressForm from "@/features/account-setup/components/user-address-form";
import UserInformationForm from "@/features/account-setup/components/user-information-form";
import Image from "next/image";
import { useState } from "react";
import dashboard from "/public/dashboard-ex.svg";
import { MultiDocumentUpload } from "@/features/account-setup/components/document-upload";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(3);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <UserInformationForm onComplete={goToNextStep} />;
      case 2:
        return <UserAddressForm onComplete={goToNextStep} />;
      case 3:
        return <MultiDocumentUpload bucketName="documents" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <BrandLogo />
      <div className="max-w-[1100px] border border-gray-300 rounded-2xl items-center grid grid-cols-[0.9fr_1fr] gap-24">
        {renderStepContent()}
        <Image
          src={dashboard}
          alt="dashboard"
          className="opacity-85 rounded-tl-md rounded-bl-md"
        />
      </div>
    </div>
  );
}
