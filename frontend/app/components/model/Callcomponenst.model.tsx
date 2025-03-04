import React from "react";
import Image from "next/image";
interface props {
  imageStyle: string;
  styles: string;
  image: string;
  text: string;
}
const CallModel: React.FC<props> = ({ imageStyle, styles, image, text }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center shadow-xl w-[200px] gap-2 rounded-2xl py-3 ${styles} text-black mb-5`}
    >
      <div className="relative">
        <Image
          src={image}
          alt="iconImage"
          height={50}
          width={50}
          className={`${imageStyle}`}
        />
      </div>
      <p className="font-bold capitalize text-lg">{text}</p>
    </div>
  );
};

export default CallModel;
