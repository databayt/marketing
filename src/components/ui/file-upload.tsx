"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  type UploadResponse,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
  onUploadSuccess?: (response: UploadResponse) => void;
  onUploadError?: (error: Error) => void;
  folder?: string;
  tags?: string[];
  className?: string;
  accept?: string;
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
  folder = "/uploads",
  tags = [],
  className = "",
  accept = "image/*,video/*"
}: FileUploadProps) {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      setUploadError("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];
    setIsUploading(true);
    setUploadError(null);
    setProgress(0);

    // Create new abort controller for this upload
    abortControllerRef.current = new AbortController();

    try {
      const authParams = await authenticator();
      const { signature, expire, token, publicKey } = authParams;

      const uploadResponse = await upload({
        file,
        fileName: file.name,
        signature,
        expire,
        token,
        publicKey,
        folder,
        tags,
        useUniqueFileName: true,
        onProgress: (event) => {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
        abortSignal: abortControllerRef.current.signal,
      });

      console.log("Upload response:", uploadResponse);
      onUploadSuccess?.(uploadResponse);
      
      // Reset form
      if (fileInput) {
        fileInput.value = "";
      }
      setProgress(0);
    } catch (error) {
      console.error("Upload error:", error);
      
      let errorMessage = "Upload failed";
      
      if (error instanceof ImageKitAbortError) {
        errorMessage = "Upload was cancelled";
      } else if (error instanceof ImageKitInvalidRequestError) {
        errorMessage = `Invalid request: ${error.message}`;
      } else if (error instanceof ImageKitUploadNetworkError) {
        errorMessage = `Network error: ${error.message}`;
      } else if (error instanceof ImageKitServerError) {
        errorMessage = `Server error: ${error.message}`;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setUploadError(errorMessage);
      onUploadError?.(error as Error);
    } finally {
      setIsUploading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          accept={accept}
          disabled={isUploading}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
        />
        
        {!isUploading ? (
          <button
            type="button"
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Cancel
          </button>
        )}
      </div>

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {uploadError && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {uploadError}
        </div>
      )}
    </div>
  );
}