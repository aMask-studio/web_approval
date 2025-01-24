import { FC, useEffect, useState } from "react";

interface Props {
    blob: Blob
}

export function ConvertToImage({blob}:Props) {
    const [blobUrl, setBlobUrl] = useState<string | undefined>();
    useEffect(() => {
        async function loadImage() {
          try {
            const url = URL.createObjectURL(blob);
            setBlobUrl(url);
          } catch (error) {
            console.error(error);
          }
        }
        if(!blobUrl) {
            loadImage();
        }
    });
    if(blobUrl){
        return blobUrl;
    }
}