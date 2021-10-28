import Modal from "components/modules/Modal";
import useModal from "components/modules/Modal/useModal";
import useUploadAttachment from "hooks/useUploadAttachment";
import { useRef } from "react";
import { MdAttachFile } from "react-icons/md";

export interface UploadProps {
  setUrl: (url: string, id: string, key: string) => void;
}

const FileUploader = ({ setUrl }: UploadProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
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
        ref={fileRef}
        accept="application/*,text/*"
        onChange={setUploadedUrl}
      />
      <button
        className="p-0 border-0 bg-transparent"
        onClick={() => fileRef.current?.click()}
      >
        <MdAttachFile className="text-xl text-gray-500 hover:text-gray-100 mr-2" />
      </button>
      <Modal onClose={closeModal} open={loading ? 1 : 0} permanent>
        <div className="py-4 px-16">
          <div className=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-l-4 border-b-4 border-blue-500"></div>
          </div>
          <h1 className="mt-4 text-gray-200 text-xl">Uploading File...</h1>
        </div>
      </Modal>
    </>
  );
};

export default FileUploader;
