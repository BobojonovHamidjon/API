import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const onSubmit = (data) => {
    axios({
        url:"https://api.fruteacorp.uz/auth/signin",
        method:'POST',
        data:data,
    }).then ((res)=>{
        localStorage.setItem("token",res.data.data.accessToken.token);
        toast.success("Muvaffaqiyatli o'tdi" )
        navigate('/dashboard')
        
    }).catch (err=>{
      toast.error("Xatolik yuz berdi, iltimos qaytadan urinib ko'ring");
      console.log(err);
      
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form 
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)} // Formni submit qilish
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Telefon raqam
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="+998901234567"
              {...register("phone", { required: true })} // register orqali inputni bog‘lash
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Parol
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              {...register("password", { required: true })} // register orqali inputni bog‘lash
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit(onSubmit)}
            >
              Kirish
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 RealAuto. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  );
}

export default Login;
