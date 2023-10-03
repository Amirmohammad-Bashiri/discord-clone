"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FileIcon, X } from "lucide-react";

import { UploadDropzone } from "@/lib/uploadthing";

import { type UploadFileResponse } from "uploadthing/client";

type FileUploadProps = {
  endpoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
  value: string;
};

function FileUpload({ endpoint, onChange, value }: FileUploadProps) {
  const [uploadRes, setUploadRes] = useState<
    UploadFileResponse[] | undefined
  >();

  const handleDeleteImage = async (fileKey: string) => {
    try {
      await axios.delete("/api/uploadthing", {
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ fileKey }),
      });
      onChange("");
    } catch (error) {
      console.log(error);
    }
  };

  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative w-20 h-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => {
            if (uploadRes) {
              handleDeleteImage(uploadRes?.[0].key);
            }
          }}
          className="absolute top-0 right-0 p-1 text-white rounded-full shadow-sm bg-rose-500"
          type="button">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
          {value}
        </a>
        <button
          onClick={() => {
            if (uploadRes) {
              handleDeleteImage(uploadRes?.[0].key);
            }
          }}
          className="absolute p-1 text-white rounded-full shadow-sm -top-2 -right-2 bg-rose-500"
          type="button">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={res => {
          setUploadRes(res);
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
        config={{ mode: "auto" }}
      />
    </div>
  );
}

export default FileUpload;
