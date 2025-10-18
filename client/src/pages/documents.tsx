import { DocumentList } from "@/components/document-list";
import { UploadZone } from "@/components/upload-zone";
import { SearchBar } from "@/components/search-bar";
import { useState } from "react";

//todo: remove mock functionality
const mockDocuments = [
  {
    id: "1",
    name: "Initial Complaint - Smith v. Johnson",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "Jan 15, 2024",
    tags: ["Filing", "Primary"],
  },
  {
    id: "2",
    name: "Evidence Photos Collection",
    type: "ZIP",
    size: "15.8 MB",
    uploadDate: "Jan 20, 2024",
    tags: ["Evidence"],
  },
  {
    id: "3",
    name: "Witness Statement - John Doe",
    type: "DOCX",
    size: "145 KB",
    uploadDate: "Jan 22, 2024",
    tags: ["Testimony", "Important"],
  },
  {
    id: "4",
    name: "Contract Agreement Final",
    type: "PDF",
    size: "892 KB",
    uploadDate: "Jan 18, 2024",
    tags: ["Contract"],
  },
  {
    id: "5",
    name: "Discovery Response Documents",
    type: "PDF",
    size: "5.2 MB",
    uploadDate: "Jan 25, 2024",
    tags: ["Discovery", "Response"],
  },
];

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = mockDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">Documents</h1>
        <p className="text-muted-foreground mt-1">
          Manage and organize all case documents
        </p>
      </div>

      <UploadZone onUpload={(files) => console.log("Uploaded:", files.length, "files")} />

      <SearchBar
        placeholder="Search documents..."
        onSearch={setSearchQuery}
        className="pl-10 max-w-xl"
      />

      <DocumentList documents={filteredDocs} />
    </div>
  );
}
