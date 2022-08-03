import React, { useRef, useState } from "react";

interface props {
  onChange: (file: File) => any;
  imageUrl?: string;
}

export const ImageUploader = ({ onChange, imageUrl }: props) => {
  const [draggingOver, setDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef(null);

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      onChange(event.currentTarget.files[0]);
    }
  };

  return (
    <div
      ref={dropRef}
      className={`${
        draggingOver
          ? "border-rounded border-4 border-dashed border-yellow-300"
          : ""
      } group relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-gray-400 transition duration-300 ease-in-out hover:bg-gray-500`}
      style={{
        backgroundSize: "cover",
        ...(imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}),
      }}
      onDragEnter={() => setDraggingOver(true)}
      onDragLeave={() => setDraggingOver(false)}
      onDrag={preventDefaults}
      onDragStart={preventDefaults}
      onDragEnd={preventDefaults}
      onDragOver={preventDefaults}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      {imageUrl && (
        <div className="absolute h-full w-full rounded-full bg-blue-400 opacity-50 transition duration-300 ease-in-out group-hover:opacity-0" />
      )}
      {
        <p className="pointer-events-none z-1 cursor-pointer select-none text-4xl font-extrabold text-gray-200 transition duration-300 ease-in-out group-hover:opacity-0">
          +
        </p>
      }
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};
