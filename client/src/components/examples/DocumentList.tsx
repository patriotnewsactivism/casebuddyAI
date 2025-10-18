import { DocumentList } from "../document-list";

export default function DocumentListExample() {
  const documents = [
    {
      id: "1",
      name: "Initial Complaint",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "Jan 15, 2024",
      tags: ["Filing", "Primary"],
    },
    {
      id: "2",
      name: "Evidence Photos",
      type: "ZIP",
      size: "15.8 MB",
      uploadDate: "Jan 20, 2024",
      tags: ["Evidence"],
    },
    {
      id: "3",
      name: "Witness Statement",
      type: "DOCX",
      size: "145 KB",
      uploadDate: "Jan 22, 2024",
      tags: ["Testimony", "Important"],
    },
  ];

  return (
    <div className="p-4 max-w-3xl">
      <DocumentList documents={documents} />
    </div>
  );
}
