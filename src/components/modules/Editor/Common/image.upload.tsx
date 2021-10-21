import useUploadAttachment from "hooks/useUploadAttachment";
import React, { useRef } from "react";
import { MdImage } from "react-icons/md";
import { UploadProps } from "./file.upload";

const ImageUploader = ({ setUrl }: UploadProps) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { generatePreSignedUrl } = useUploadAttachment();

  const setUploadedUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const attachment = await generatePreSignedUrl(
      (e.target.files as FileList)[0] as File
    );

    setUrl(
      attachment.url as string,
      attachment.id as string,
      attachment.key as string
    );
  };

  return (
    <>
      <input
        type="file"
        hidden
        ref={imageRef}
        accept="image/*"
        multiple={false}
        onChange={setUploadedUrl}
      />
      <button
        className="p-0 border-0 bg-transparent"
        onClick={() => imageRef.current?.click()}
      >
        <MdImage className="text-xl text-gray-500 hover:text-gray-100 mr-2" />
      </button>
    </>
  );
};

export default ImageUploader;
