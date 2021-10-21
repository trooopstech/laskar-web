import useUploadAttachment from "hooks/useUploadAttachment";
import { useRef } from "react";
import { MdAttachFile } from "react-icons/md";

export interface UploadProps {
  setUrl: (url: string, id: string, key: string) => void;
}

const FileUploader = ({ setUrl }: UploadProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
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
    </>
  );
};

export default FileUploader;
