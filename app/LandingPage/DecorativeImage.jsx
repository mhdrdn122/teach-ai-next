import React from "react";
import Image from "next/image";

const DecorativeImageWrapper = ({ images }) => {
  return (
    <>
      {images.map((img, index) => (
        <Image
          key={index} 
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          style={{
            position: "absolute",
            zIndex: 1,
            top: img.top,
            left: img.left,
            right: img.right,
            bottom: img.bottom,
            transform: img.rotate ? `rotate(${img.rotate})` : undefined,
            animation: img.animation,
          }}
          className={`hidden md:block ${img.className || ""}`}
        />
      ))}
    </>
  );
};

export default DecorativeImageWrapper;