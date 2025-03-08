import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, setValue, watch, handleSubmit,reset } = useForm();
  const [selectedItem, setSelectedItem] = useState(null)
  const [banner, setBanner] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); 
  const token = localStorage.getItem("token");
  const baseUrl = "https://api.fruteacorp.uz";

  const getBanner = () => {
    axios.get(`${baseUrl}/banner`).then(res => {
      setBanner(res.data.data);
    });
  };

  useEffect(() => {
    getBanner();
  }, []);


  const handleFile = (e) => {
    const file = e.target.files[0];
    if(file){
      setValue("image", file);
    }
  };

  
  const onSubmit = (data) => {
    const file = watch('image');
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('link', data.link);
        if (file){
          formData.append('image', file);
        }

    axios({
      url: `${baseUrl}/banner/${selectedItem.id}`,
      method: selectedItem? 'PATCH': 'POST',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((res) => {
      setModalOpen(false); 
      getBanner(); 
      reset();
    });
  };
  const  showBanner = (banner)=>{
     setValue('title',banner.title)
     setValue('link',banner.link)
    setSelectedItem(banner)
     setModalOpen(true)
  }
  const deleteBanner = (id) => {
    axios({
      url: `${baseUrl}/banner/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      getBanner();
    });
  }

  return (
    
    <div className="min-h-screen bg-gray-100 p-6">
      
      
      <div className="flex justify-end mb-4">
      
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          + Banner Qo'shish
        </button>
      </div>

    
      <div className="grid grid-cols-4 gap-4">
        {banner && banner.map((item, index) => (
          <div key={index} className="p-4 border rounded bg-white shadow-lg">
            <img className="w-full h-40 object-cover rounded" src={`${baseUrl}/images/${item.image}`} alt={item.title} />
            <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
            <div className="flex gap-2 mt-2">
  <a
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
  >
    Batafsil
  </a>

  <button
    onClick={() => showBanner(item)}
    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700 transition"
  >
    Edit
  </button>

  <button
    onClick={() => deleteBanner(item.id)}
    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition"
  >
    O'chirish
  </button>
</div>

          </div>
        ))}
      </div>

      
      {modalOpen && (
        <div className="fixed inset-0  bg-opacity-60 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            
          
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Banner Qo'shish
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
              <div>
                <label className="block text-gray-700 font-medium mb-1">Sarlavha</label>
                <input
                  type="text"
                  {...register("title")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Banner nomini kiriting..."
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Havola</label>
                <input
                  type="text"
                  {...register("link")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Havolani kiriting..."
                />
              </div>

         
              <div>
                <label className="block text-gray-700 font-medium mb-1">Rasm yuklash</label>
                <input
                  type="file"
                  onChange={handleFile}
                  className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer file:bg-blue-500 file:text-white file:font-semibold file:px-4 file:py-2 file:rounded file:border-none file:cursor-pointer hover:file:bg-blue-700"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
              >
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
