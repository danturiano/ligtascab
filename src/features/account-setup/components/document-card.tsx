"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

// Define maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Document type definition
interface DocumentType {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

// Props for each document card
interface DocumentCardProps {
  document: DocumentType;
  onFileSelect: (docId: string, file: File | null) => void;
  selectedFile: File | null;
}

export default function DocumentCard({
  document,
  onFileSelect,
  selectedFile,
}: DocumentCardProps) {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isImage = (file: File): boolean => {
    return file?.type.startsWith("image/");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast(`File ${selectedFile.name} is too large. Maximum size is 5MB.`);
      return;
    }

    setFileName(selectedFile.name);
    onFileSelect(document.id, selectedFile);

    if (isImage(selectedFile)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    setFilePreview(null);
    setFileName("");
    onFileSelect(document.id, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader className="w-full flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileIcon className="h-6 w-6" />
          <div className="flex-col items-center">
            <div className="flex items-center gap-2">
              <h3 className="text-md font-bold">{document.title}</h3>
              {document.required && (
                <span className="text-red-500 text-xs">Required</span>
              )}
            </div>
            <p className="text-gray-700 text-xs">{document.description}</p>
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
            onClick={handleAttachClick}
          >
            {selectedFile ? "Change" : "Attach"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />

        {selectedFile && (
          <div className="flex items-center p-2 bg-gray-50 rounded-md">
            <div className="flex-grow flex items-center gap-2">
              {filePreview ? (
                <div className="relative h-10 w-10 overflow-hidden rounded">
                  <Image
                    src={filePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ) : (
                <FileIcon className="h-6 w-6 text-blue-500" />
              )}
              <span className="text-sm truncate max-w-xs">{fileName}</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={removeFile}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
