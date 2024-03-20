"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { sources } from "next/dist/compiled/webpack/webpack";

interface CloudinaryFile {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={240}
          height={170}
          alt="uploaded image"
        />
      )}
      <CldUploadWidget
        uploadPreset="yg8p8e7z"
        onSuccess={(result, widget) => {
          const info = result.info as CloudinaryFile;
          setPublicId(info.public_id);
        }}
        options={{
          sources: ["local"],
          multiple: false,
          styles: {
            palette: {
              window: "#5BA1F1",
              windowBorder: "#4D82C1",
              tabIcon: "#FFFFFF",
              menuIcons: "#FFFFFF",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#FAFDFF",
              action: "#FF620C",
              inactiveTabIcon: "#0E2F5A",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#1D4161",
            },
          },
        }}
      >
        {({ open }) => {
          return (
            <button className="btn btn-primary" onClick={() => open()}>
              UPLOAD
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
