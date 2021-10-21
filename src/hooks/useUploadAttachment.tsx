import { useMutation } from "@apollo/client";
import { GET_PRE_SIGNED_URL, SAVE_ATTACHMENT } from "schema/attachment";

import axios from "axios";

const useUploadAttachment = () => {
  const [getPreSigned] = useMutation(GET_PRE_SIGNED_URL);
  const [save] = useMutation(SAVE_ATTACHMENT);

  const generatePreSignedUrl = async (file: File): Promise<Attachment> => {
    const res = await getPreSigned({
      variables: {
        fileName: file?.name,
        contentType: file?.type,
      },
    });

    const preSigned = res.data.getPreSignedUrl as Attachment;

    await axios.create().put(preSigned.url ?? "", file, {
      headers: {
        "content-type": preSigned.content_type,
      },
    });

    return await saveAttachment(file.type, preSigned.key);
  };

  const saveAttachment = async (
    contentType: string,
    key: string
  ): Promise<Attachment> => {
    const res = await save({
      variables: {
        key,
        contentType,
      },
    });

    return res.data.saveAttachment;
  };

  return { generatePreSignedUrl };
};

export default useUploadAttachment;
