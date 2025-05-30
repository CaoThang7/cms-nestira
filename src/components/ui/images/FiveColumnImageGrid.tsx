import Image from "next/image";
import React from "react";

interface ImageData {
  id: number;
  url: string;
}

interface Props {
  images: ImageData[];
}

export default function FiveColumnImageGrid({ images }: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {images.map((image) => (
        <div key={image.id}>
          <Image
            src={image.url}
            alt={`grid image ${image.id}`}
            className="w-full border border-gray-200 dark:border-gray-800"
            width={338}
            height={192}
          />
        </div>
      ))}
    </div>
  );
}
