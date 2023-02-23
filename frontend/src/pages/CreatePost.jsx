import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { preview } from "../assets/index";
import { getRandomPrompt } from "../utils/index";
import { FormField, Loader } from '../components';

const CreatePost = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.name === "" || form.prompt === "" || form.photo === "") {
      alert("Please make sure to fill all fields");
      return ;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/v1/post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      await response.json();
      navigate("/");
    }
    catch (e) {
      console.error("Can't create post");
    }
    finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setForm((pervForm) => ({...pervForm, [e.target.name]: e.target.value}));
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm((pervForm) => ({...pervForm, prompt: randomPrompt}));
  }

  const generateImage = async () => {
    if (!form.prompt) {
      alert("Please make sure to enter a prompt");
      return;
    }

    try {
      setGeneratingImg(true);
      const response = await fetch("http://localhost:5000/api/v1/dalle/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      const data = await response.json();
      setForm((pervForm) => ({...pervForm, photo: `data:image/jpeg;base64,${data?.photo}`}))
    }
    catch(e) {
      console.error(e.message);
    }
    finally {
      setGeneratingImg(false);
    }
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666E75] text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="an armchair in the shape of an avocado"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {
              form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className='w-full h-full object-contain'
                />
              ) : (
                <img
                  src={preview}
                  alt='preview'
                  className='w-9/12 h-9/12 object-contain opacity-40'
                />
              )
            }
            {
              generatingImg && (
                <div className='absolute inset-0 z-0 left-0 flex justify-center items-center rounded-lg' style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Loader />
                </div>
              )
            }
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button
            type="button"
            onClick={generateImage}
            className='text-white bg-green-700 font-medim rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {
              generatingImg ? "Generating..." : "Generate"
            }
          </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#666E75] text-[14px]'>Once you have created the image you want, you can share it with others in the community</p>
          <button className='mt-3 text-white bg-[#6469FF] font-medium rounded-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
            {
              loading ? "Sharing..." : "Share with the community"
            }
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost