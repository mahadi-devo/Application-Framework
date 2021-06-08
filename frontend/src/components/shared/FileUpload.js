import React from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const fileUploader = ({
  noOfFiles,
  multiple,
  input,
  fileTypes,
  getFileCallback,
}) => {
  const handleChangeStatus = async (e) => {
    if (e.meta.status === 'done') {
      return await getFileCallback(e.file);
    } else {
      return await getFileCallback(null);
    }
  };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      maxFiles={noOfFiles}
      multiple={multiple}
      styles={{ dropzone: { minHeight: 100, maxHeight: 100 } }}
      inputContent={input}
      accept={fileTypes}
      canRemove={true}
    />
  );
};

export default fileUploader;
