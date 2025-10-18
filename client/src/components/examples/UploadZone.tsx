import { UploadZone } from "../upload-zone";

export default function UploadZoneExample() {
  return (
    <div className="p-4 max-w-2xl">
      <UploadZone
        onUpload={(files) => console.log("Files uploaded:", files.length)}
      />
    </div>
  );
}
