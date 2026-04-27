import React from "react";
import { Image } from "lucide-react";
function GalleryAdmin() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <Image size={40} className="text-red-500 mb-3" />
      <h2 className="text-white text-xl font-bold">Gallery</h2>
      <p className="text-gray-500 text-sm mt-1">Gallery management coming soon.</p>
    </div>
  );
}
export default GalleryAdmin;
