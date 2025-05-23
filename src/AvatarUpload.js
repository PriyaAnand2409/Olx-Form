import React, { useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';

const AvatarUpload = () => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-white text-4xl overflow-hidden">
          {image ? (
            <img src={image} alt="Avatar" className="object-cover w-full h-full" />
          ) : (
            'P'
          )}
        </div>
        <button
          onClick={handleImageClick}
          className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md"
        >
          <FaCamera className="text-gray-800" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default AvatarUpload;
