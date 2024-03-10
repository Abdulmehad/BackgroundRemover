import { useEffect, useState } from 'react';
import axios from 'axios';

function useBgRemoval(formData){

  const [resultImage, setResultImage] = useState(null);

  useEffect(() => {
    async function removeBackground() {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Api-Key': 'YOUR_API_KEY'
        },
        responseType: 'blob'
      });

      setResultImage(URL.createObjectURL(response.data));
    } 
    catch (error) {
      console.error('Error removing background:', error);
    }}

    if (formData) {
      removeBackground();
    }
}), [formData];


  return resultImage;
};

export default useBgRemoval;
