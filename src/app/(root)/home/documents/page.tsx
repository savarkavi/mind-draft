"use client";

import { platypi } from "@/app/(marketing)/_components/Heading";
import UploadModal from "../_components/UploadModal";
import DocumentsList from "../_components/DocumentsList";
import { useUser } from "@clerk/nextjs";

const DocumentsPage = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="mt-12 px-10 max-w-[1600px] mx-auto h-[700px] lg:h-[800px] overflow-y-auto focus:outline-none">
      <div className="sm:flex gap-8 items-center justify-between">
        <h1 className={`text-3xl border ${platypi.className}`}>My Documents</h1>
        <div className="mt-6 sm:mt-0">
          <UploadModal />
        </div>
      </div>
      <DocumentsList />
    </div>
  );
};

export default DocumentsPage;
