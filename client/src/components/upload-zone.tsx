import { Card } from "@/components/ui/card";
import { Upload, Loader2, FileCheck, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface UploadZoneProps {
  className?: string;
  onUpload?: (files: FileList) => void;
}

export function UploadZone({ className, onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/knowledge"] });
      
      toast({
        title: "Document Uploaded & Analyzed",
        description: (
          <div className="space-y-2">
            <p>Document has been processed and analyzed by AI</p>
            {data.analysis && (
              <div className="text-sm space-y-1">
                <p className="font-medium">Type: {data.analysis.documentType}</p>
                <p>Extracted {data.analysis.keyTerms?.length || 0} key terms</p>
                <p>Added {data.analysis.extractedKnowledge?.length || 0} concepts to knowledge base</p>
              </div>
            )}
          </div>
        ),
      });
      setUploadProgress(0);
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload document",
        variant: "destructive",
      });
      setUploadProgress(0);
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        if (onUpload) {
          onUpload(e.dataTransfer.files);
        }
        await handleFiles(files);
      }
    },
    [onUpload]
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        if (onUpload) {
          onUpload(e.target.files);
        }
        const files = Array.from(e.target.files);
        await handleFiles(files);
      }
    },
    [onUpload]
  );

  const handleFiles = async (files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (!validTypes.includes(file.type) && !file.name.match(/\.(txt|pdf|doc|docx)$/i)) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive",
        });
        continue;
      }

      // Simulate progress
      setUploadProgress(0);
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      try {
        await uploadMutation.mutateAsync(file);
        setUploadProgress(100);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        clearInterval(progressInterval);
        setTimeout(() => setUploadProgress(0), 2000);
      }
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        className={cn(
          "border-2 border-dashed p-12 text-center cursor-pointer transition-all",
          isDragging && "border-primary bg-primary/10 scale-[1.02]",
          uploadMutation.isPending && "pointer-events-none opacity-50"
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
          accept=".pdf,.doc,.docx,.txt"
          data-testid="input-file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          {uploadMutation.isPending ? (
            <>
              <Loader2 className="mx-auto h-12 w-12 text-primary mb-4 animate-spin" />
              <h3 className="font-semibold mb-2">Processing Document...</h3>
              <p className="text-sm text-muted-foreground">
                AI is analyzing and extracting knowledge
              </p>
            </>
          ) : (
            <>
              <div className="relative inline-block">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <Brain className="absolute -top-1 -right-1 h-6 w-6 text-primary animate-pulse" />
              </div>
              <h3 className="font-semibold mb-2">Upload Legal Documents</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supports PDF, DOC, DOCX, TXT • Max 50MB
              </p>
              <p className="text-xs text-primary mt-2 flex items-center justify-center gap-1">
                <Brain className="h-3 w-3" />
                Auto-analyzed and added to knowledge base
              </p>
            </>
          )}
        </label>
      </Card>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Uploading and analyzing...</span>
            <span className="font-medium">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {uploadMutation.isSuccess && uploadProgress === 100 && (
        <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <FileCheck className="h-5 w-5 text-green-500" />
          <div className="flex-1">
            <p className="text-sm font-medium">Document processed successfully</p>
            <p className="text-xs text-muted-foreground">Knowledge base updated</p>
          </div>
        </div>
      )}
    </div>
  );
}
