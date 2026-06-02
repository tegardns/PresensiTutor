import { Camera } from "lucide-react";

import type { ProfilePhotoSectionProps } from "../types";

export default function ProfilePhotoSection({
  fullName,
  profilePhoto,
  photoInputRef,
  onPhotoChange,
}: ProfilePhotoSectionProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="size-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl overflow-hidden">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              className="size-full object-cover"
            />
          ) : (
            <span>{fullName.charAt(0)}</span>
          )}
        </div>

        <button
          onClick={() => photoInputRef.current?.click()}
          className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm"
        >
          <Camera className="size-4" />
        </button>

        <input
          ref={photoInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={onPhotoChange}
          className="hidden"
        />
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Klik ikon kamera untuk mengubah foto
      </p>
    </div>
  );
}