"use client";

import SpinnerMini from "@/components/spinner-mini";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateUserNew, uploadImage } from "../actions/setup";
import DocumentCard from "./document-card";

const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: "tricycle-permit",
    title: "Tricycle Operator Permit",
    description: "Upload the official tricycle operator permit document",
    required: true,
  },
  {
    id: "business-permit",
    title: "Business Permit",
    description: "Upload your current business permit from the municipality",
    required: true,
  },
];

interface DocumentType {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

interface MultiDocumentUploadProps {
  bucketName: string;
}

interface DocumentWithFile {
  documentType: DocumentType;
  file: File;
}

interface UploadedDocument {
  documentId: string;
  documentTitle: string;
  url: string;
  filename: string | undefined;
}

export function MultiDocumentUpload({ bucketName }: MultiDocumentUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<{
    [key: string]: File | null;
  }>({});
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);

  // Handle file selection for a specific document type
  const handleFileSelect = (docId: string, file: File | null) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [docId]: file,
    }));
  };

  // Prepare documents with files for upload
  const getDocumentsToUpload = (): DocumentWithFile[] => {
    return DOCUMENT_TYPES.filter((docType) => selectedFiles[docType.id]).map(
      (docType) => ({
        documentType: docType,
        file: selectedFiles[docType.id]!,
      })
    );
  };

  // Check if all required documents are attached
  const areAllRequiredFilesAttached = (): boolean => {
    return DOCUMENT_TYPES.filter((docType) => docType.required).every(
      (docType) => selectedFiles[docType.id]
    );
  };

  // Handle the complete setup button click
  const handleCompleteSetup = async () => {
    const documentsToUpload = getDocumentsToUpload();

    if (documentsToUpload.length === 0) {
      toast.error("Please attach at least one document");
      return;
    }

    if (!areAllRequiredFilesAttached()) {
      toast.error("Please attach all required documents");
      return;
    }

    setUploading(true);

    try {
      const uploadResults: UploadedDocument[] = [];

      for (const doc of documentsToUpload) {
        try {
          const { imageUrl, error, filename } = await uploadImage({
            file: doc.file,
            bucket: bucketName,
            documentId: doc.documentType.id,
          });

          if (error) {
            toast.error(`Failed to upload ${doc.documentType.title}: ${error}`);
          } else {
            uploadResults.push({
              documentId: doc.documentType.id,
              documentTitle: doc.documentType.title,
              url: imageUrl,
              filename: filename,
            });
          }
        } catch (error) {
          console.error(`Error uploading ${doc.documentType.title}:`, error);
          toast.error(`Failed to upload ${doc.documentType.title}`);
        }
      }

      setUploadedDocs(uploadResults);

      if (uploadResults.length === documentsToUpload.length) {
        // Check if all required document types have been uploaded
        const allRequiredUploaded = DOCUMENT_TYPES.filter(
          (docType) => docType.required
        ).every((docType) =>
          uploadResults.some((result) => result.documentId === docType.id)
        );

        if (allRequiredUploaded) {
          try {
            // Update user status to not new user
            const data = await updateUserNew({ is_new_user: false });
            if (data) {
              toast.success("Setup completed successfully!");
              // Redirect to dashboard
              redirect("/dashboard");
            } else {
              toast.error("Failed to update user status");
            }
          } catch (error) {
            console.error("Error updating user status:", error);
            toast.error("Failed to complete setup");
          }
        } else {
          toast.warning("Some required documents are missing");
        }
      } else {
        toast.warning("Some documents failed to upload");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to complete document uploads");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="py-8 px-6">
      <h2 className="text-2xl font-bold mb-6">Required Documents</h2>
      <p className="text-gray-700 mb-6">
        Please attach all the required documents below. Once all required
        documents are attached, click the &quot;Complete Setup&quot; button to
        finish the process.
      </p>

      {DOCUMENT_TYPES.map((docType) => (
        <DocumentCard
          key={docType.id}
          document={docType}
          onFileSelect={handleFileSelect}
          selectedFile={selectedFiles[docType.id] || null}
        />
      ))}

      <div className="mt-6">
        <Button
          className="w-full"
          onClick={handleCompleteSetup}
          disabled={!areAllRequiredFilesAttached() || uploading}
        >
          {uploading ? <SpinnerMini /> : "Complete Setup"}
        </Button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {!areAllRequiredFilesAttached()
            ? "Please attach all required documents to continue"
            : "Click to upload all documents and complete the setup"}
        </p>
      </div>
    </div>
  );
}
