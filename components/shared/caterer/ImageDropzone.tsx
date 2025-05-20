import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface ImageDropzoneProps {
  dragActive: boolean;
  fileError: string | null;
  isVisible: boolean;
  className: string;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  dragActive,
  fileError,
  isVisible,
  className,
  handleDrag,
  handleDrop,
  handleFileChange,
}) => {
  return (
    <div className={cn(!isVisible && "hidden", `${className} w-full`)}>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-40 p-4 mt-4 border-4 border-dashed rounded-lg transition-all",
          dragActive ? "border-primary bg-primary/10" : "border-muted",
          fileError && "border-destructive"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
        <p className="text-sm text-center text-muted-foreground">
          Drag & drop your profile image here
        </p>
        <p className="text-xs text-center text-muted-foreground mt-1">or</p>
        <label htmlFor="profile-upload" className="mt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer"
            asChild
          >
            <span>Browse files</span>
          </Button>
          <Input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {fileError && <p className="text-sm text-destructive">{fileError}</p>}

      <p className="text-xs text-center text-muted-foreground mt-4">
        Accepted formats: JPG, PNG, GIF, etc.
        <br />
        Maximum size: 10MB
      </p>
    </div>
  );
};

export default ImageDropzone;
