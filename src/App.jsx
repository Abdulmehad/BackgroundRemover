import { useState } from 'react';
import useBgRemoval from './customhook/useBgRemoval';

function App() {
  const [image, setImage] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setShowResult(false);
  };

  const formData = new FormData();
  if (image) {
    formData.append('image_file', image);
    formData.append('size', 'auto');
  }

  const resultImage = useBgRemoval(formData);

  const handleRemoveBackground = () => {
    setImage(null);
    setShowResult(true);
  };

  return (
    <>
    <div className="container mx-auto mt-8 p-4 bg-gray-200 rounded-lg flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-4">
        <input type='file' onChange={handleImageChange} className="flex-shrink-0" />
        {!showResult && (
          <button onClick={handleRemoveBackground} className="bg-blue-500 text-white px-4 py-2 rounded">
            Remove Background
          </button>
        )}
      </div>

      {image && (
        <div className="flex justify-center items-center">
          <img
            src={URL.createObjectURL(image)}
            alt='Uploaded File'
            className="mt-4 rounded"
          />
        </div>
      )}

      <div className="flex flex-col items-center mt-4">
        {showResult && resultImage && (
          <div className="flex justify-center items-center">
            <img src={resultImage} alt='Result' className="mt-4 rounded" />
          </div>
        )}

        <a href={resultImage} download='result.png' className={resultImage && showResult ? 'block' : 'hidden'}>
          <button className="bg-green-400 text-white px-4 py-2 rounded mt-4">
            Download
          </button>
        </a>
      </div>
    </div>
  </>
  );
}

export default App;
