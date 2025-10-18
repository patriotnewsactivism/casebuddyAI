import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface UploadZoneProps {
  className?: string;
  onUpload?: (files: FileList) => void;
}

export function UploadZone({ className, onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && onUpload) {
      onUpload(e.dataTransfer.files);
      console.log("Files dropped:", e.dataTransfer.files.length);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onUpload) {
      onUpload(e.target.files);
      console.log("Files selected:", e.target.files.length);
    }
  };

  return (
    <Card
      className={cn(
        "border-2 border-dashed p-12 text-center hover-elevate cursor-pointer transition-colors",
        isDragging && "border-primary bg-primary/5",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-testid="upload-zone"
    >
      <input
        type="file"
        multiple
        className="hidden"
        id="file-upload"
        onChange={handleFileChange}
        data-testid="input-file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="font-semibold mb-2">Upload Documents</h3>
        <p className="text-sm text-muted-foreground">
          Drag and drop files here, or click to browse
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Supports PDF, DOC, DOCX, images, and more
        </p>
      </label>
    </Card>
  );
}
