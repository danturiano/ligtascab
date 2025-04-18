import React from 'react';
import TricycleComplianceForm from '@/features/tricycles/components/tricycle-compliance-form';
import TricycleDetailsForm from '@/features/tricycles/components/tricycle-details-form';
import TricycleDocumentsUpload from '@/features/tricycles/components/tricycle-documents-upload';
import TricycleMaintenanceForm from '@/features/tricycles/components/tricycle-maintenance-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useCreateTricycle } from './create-tricycle-provider';

export default function FormReview() {
  const { prevStep } = useCreateTricycle();

  return (
    <div>
      <div className="flex flex-col gap-4 mb-24">
        <TricycleDetailsForm />
        <TricycleComplianceForm />
        <TricycleMaintenanceForm />
        <TricycleDocumentsUpload />
      </div>
      <div
        className={`w-full bg-card h-16 flex items-center fixed bottom-0 left-0`}
      >
        <div className="max-w-screen-lg w-full mx-auto flex justify-between">
          <Button variant={'outline'} size={'lg'} onClick={prevStep}>
            <ArrowLeft />
            Back
          </Button>
          <Button size={'lg'} type="submit">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
