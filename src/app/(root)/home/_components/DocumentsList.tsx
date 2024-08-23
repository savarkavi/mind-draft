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

  if (documents.length === 0) {
    return (
      <div className="h-full flex justify-center items-center">
        <h2 className="text-xl">No documents available.</h2>
      </div>
    );
  }

  return (
    <div className="mt-16 grid gap-8 justify-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {documents.map((document, i) => {
        return (
          <DocumentCard
            key={document._id}
            document={document}
            idx={i}
            length={documents.length}
          />
        );
      })}
    </div>
  );
};

export default DocumentsList;
