import { useMutation } from "@apollo/client";
import { GET_PRE_SIGNED_URL, SAVE_ATTACHMENT } from "schema/attachment";

import axios from "axios";
import { useState } from "react";

const useUploadAttachment = () => {
  const [getPreSigned] = useMutation(GET_PRE_SIGNED_URL);
  const [save] = useMutation(SAVE_ATTACHMENT);
  const [loading, setLoading] = useState(false);

  const generatePreSignedUrl = async (file: File): Promise<Attachment> => {
    try {
      setLoading(true);
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
    } catch (error) {
      setLoading(false);
      console.log(error);
      return {} as Attachment;
    }
  };

  const saveAttachment = async (
    contentType: string,
    key: string
  ): Promise<Attachment> => {
    try {
      const res = await save({
        variables: {
          key,
          contentType,
        },
      });

      setLoading(false);

      return res.data.saveAttachment;
    } catch (error) {
      setLoading(false);
      console.log(error);
      return {} as Attachment;
    }
  };

  return { generatePreSignedUrl, loading };
};

export default useUploadAttachment;
