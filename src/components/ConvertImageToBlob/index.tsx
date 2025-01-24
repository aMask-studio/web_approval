import { useRef, useEffect, useState } from "react";
import { AddNews } from "../../api/AddNews";
import { API } from "../../api/ConnectionData";

// async function getBlobData(blob:Blob): Promise<ArrayBuffer> {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
    
//         reader.onload = () => {
//           if (reader.result instanceof ArrayBuffer) {
//             resolve(reader.result);
//           } else {
//             reject(new Error('Failed to read Blob as ArrayBuffer'));
//           }
//         };
    
//         reader.onerror = () => {
//           reject(reader.error);
//         };
    
//         reader.readAsArrayBuffer(blob);
//       });
// }

const ConvertImageToBlob = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedImage(event.target.files[0]);
      }
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (!selectedImage) {
        alert("Пожалуйста, выберите изображение.");
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('image', selectedImage);
  
        const response = await fetch(`${API}/upload-image`, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
  
        const result = await response.json();
        console.log(result.message);
      } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
      }
    };
  
    return (
      <div>
        <h2>Загрузить изображение</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleChange} />
          <button type="submit">Отправить</button>
        </form>
        {selectedImage && (
          <div>
            <p>Выбранное изображение:</p>
            <img src={URL.createObjectURL(selectedImage)} alt="Preview" height="200" width="auto" />
          </div>
        )}
      </div>
    );
}
export default ConvertImageToBlob;