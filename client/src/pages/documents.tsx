import { DocumentList } from "@/components/document-list";
import { UploadZone } from "@/components/upload-zone";
import { SearchBar } from "@/components/search-bar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ["/api/documents"],
  });

  const filteredDocs = documents.filter((doc: any) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Transform data to match DocumentList component expectations
  const transformedDocs = filteredDocs.map((doc: any) => ({
    id: doc.id,
    name: doc.name,
    type: doc.type.split('/').pop()?.toUpperCase() || doc.type,
    size: doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : "Unknown",
    uploadDate: doc.uploadDate ? new Date(doc.uploadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Unknown",
    tags: doc.tags || [],
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">Documents</h1>
        <p className="text-muted-foreground mt-1">
          Upload and manage legal documents with AI-powered analysis
        </p>
      </div>

      <UploadZone />

      <SearchBar
        placeholder="Search documents..."
        onSearch={setSearchQuery}
        className="pl-10 max-w-xl"
      />

      {isLoading ? (
        <Card>
          <CardContent className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      ) : transformedDocs.length === 0 && !searchQuery ? (
        <Card>
          <CardHeader>
            <CardTitle>No Documents Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Upload your first legal document to get started. Documents will be automatically analyzed and added to your knowledge base.
            </p>
          </CardContent>
        </Card>
      ) : (
        <DocumentList documents={transformedDocs} />
      )}
    </div>
  );
}
