"use client";

import { useQuery } from "convex/react";
import { Loader } from "lucide-react";
import { api } from "../../../../../convex/_generated/api";
import DocumentCard from "./DocumentCard";

const DocumentsList = () => {
  const documents = useQuery(api.documents.getDocuments);

  if (!documents) {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-16 flex gap-8 flex-wrap">
      {documents.map((document) => {
        return <DocumentCard key={document._id} document={document} />;
      })}
    </div>
  );
};

export default DocumentsList;
