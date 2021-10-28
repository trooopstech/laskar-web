import Modal from "components/modules/Modal";
import useModal from "components/modules/Modal/useModal";
import useUploadAttachment from "hooks/useUploadAttachment";
import React, { useRef } from "react";
import { MdImage } from "react-icons/md";
import { UploadProps } from "./file.upload";

const ImageUploader = ({ setUrl }: UploadProps) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { generatePreSignedUrl, loading } = useUploadAttachment();
  const { closeModal } = useModal();

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
      <Modal onClose={closeModal} open={loading ? 1 : 0} permanent>
        <div className="py-4 px-16">
          <div className=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-l-4 border-b-4 border-blue-500"></div>
          </div>
          <h1 className="mt-4 text-gray-200 text-xl">Uploading Image...</h1>
        </div>
      </Modal>
    </>
  );
};

export default ImageUploader;
