import { Close, UploadFileOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import React, { forwardRef, useLayoutEffect, useRef, useState } from "react";

type AcceptedFileTypes = "image/*" | "image/jpg" | "image/jpeg" | "image/png";

type FileInputProps = {
  label: string;
  borderColor: string;
  color:
    | "disabled"
    | "action"
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning";
  acceptedFileTypes: AcceptedFileTypes[] | string[];
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  error: boolean;
};

const NO_FILES_CHOOSEN = "No file choosen yet";

export default forwardRef(function FileInput(
  { label, borderColor, color, acceptedFileTypes, onChange, error }: FileInputProps,
  _ref
) {
  const acceptedFiles = acceptedFileTypes.map((fileType) => fileType).join(",");

  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState(NO_FILES_CHOOSEN);
  const [parentDivDragClass, setParentDivDragClass] = useState("");

  const fileInputRef: React.LegacyRef<HTMLInputElement> | undefined = useRef(null);
  const imageContainerRef: React.LegacyRef<HTMLDivElement> | undefined = useRef(null);
  const parentContainerRef: React.LegacyRef<HTMLDivElement> | undefined = useRef(null);
  const fileUploadStackRef: React.LegacyRef<HTMLDivElement> | undefined = useRef(null);

  useLayoutEffect(() => {
    parentContainerRef.current &&
      (parentContainerRef.current.style.borderColor = borderColor);
  }, [borderColor]);

  const handleParentDivClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (
      e.target !== imageContainerRef.current &&
      !imageContainerRef.current?.contains(e.target as Node)
    ) {
      fileInputRef.current?.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      setImage(URL.createObjectURL(files[0]));
    } else {
      setFileName(NO_FILES_CHOOSEN);
      setImage("");
      e.target.value = "";
    }

    if (onChange) {
      onChange(e);
    }
  };

  const removeSelectedImage = () => {
    setFileName(NO_FILES_CHOOSEN);
    setImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const preventDefaultBehaviour = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleParentDivDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaultBehaviour(e);
    setParentDivDragClass("border-[#ffffff] bg-slate-500 opacity-[0.7]");
  };

  const handleParentDivDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaultBehaviour(e);
  };

  const handleParentDivDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaultBehaviour(e);
    if (
      e.relatedTarget === null ||
      !parentContainerRef.current?.contains(e.relatedTarget as Node)
    ) {
      setParentDivDragClass("");
    }
  };

  const handleParentDivDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaultBehaviour(e);
    setParentDivDragClass("");

    const { files } = e.dataTransfer;
    if (files && files.length > 0 && fileInputRef.current) {
      fileInputRef.current.files = files;
    }

    const event = new Event("change", { bubbles: true });
    if (fileInputRef.current) {
      fileInputRef.current.dispatchEvent(event);
    }
  };

  return (
    <>
      <div
        className={`border-2 rounded-md border-dashed w-full h-[250px] flex flex-col items-center justify-center cursor-pointer ${parentDivDragClass}`}
        ref={parentContainerRef}
        onClick={handleParentDivClick}
        onDragEnter={handleParentDivDragEnter}
        onDragOver={handleParentDivDragOver}
        onDragLeave={handleParentDivDragLeave}
        onDrop={handleParentDivDrop}>
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFiles}
          onChange={handleInputChange}
          hidden
        />
        {image ? (
          <div className="relative z-0 h-full py-2" ref={imageContainerRef}>
            <img className="h-full" src={image} alt={fileName} />
            <Close
              className="absolute z-10 top-[-12px] right-[-12px] rounded-full bg-neutral-100"
              fontSize="medium"
              color="error"
              onClick={removeSelectedImage}
            />
          </div>
        ) : (
          <Stack
            spacing={1.5}
            alignItems="center"
            justifyContent="center"
            ref={fileUploadStackRef}>
            <UploadFileOutlined
              className="fill-purple-600"
              color={parentDivDragClass ? "inherit" : color}
              fontSize="large"
            />
            <p className={`text-[${error && "#d32f2f"}]`}>{label}</p>
          </Stack>
        )}
      </div>
      <p className="text-left">{fileName}</p>
    </>
  );
});
