import React from 'react';

interface HeadingsBoxProps {
  heading: string;
  subheading?: string;
}

const HeadingsBox = ({ heading, subheading }: HeadingsBoxProps) => {
  return (
    <div className="flex flex-col items-center justify-center my-5 text-center px-4">

      <h1 className="uppercase heading whitespace-pre-line bg-black px-10 py-10 text-3xl font-extrabold text-white max-w-5xl w-full sm:text-[54px] sm:leading-[64px] leading-[46px]">
        {heading}
      </h1>

      {subheading && (
        <p className="font-medium text-[20px] text-white max-w-3xl mt-4 break-words">
        {subheading}
      </p>
      )}
      
    </div>
  );
};

export default HeadingsBox;
