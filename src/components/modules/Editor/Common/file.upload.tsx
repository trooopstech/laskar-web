import { useRef } from "react";
import { MdAttachFile } from "react-icons/md";

export interface UploadProps {
  setUrl: (url: string, id: string, key: string) => void;
}

const FileUploader = ({}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        hidden
        ref={fileRef}
        accept="application/*,text/*"
        onChange={(e) => console.log(e.target.files)}
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
