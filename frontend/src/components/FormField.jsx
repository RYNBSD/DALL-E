import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label className='block text-sm font-medium text-gray-900' htmlFor={name}>
          {labelName}
        </label>
        {
          isSurpriseMe && (
            <button className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black' onClick={handleSurpriseMe} type='button'>
              Surprise me
            </button>
          )
        }
      </div>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649FF] focus:border-[#4649FF] outline-noe block w-full p-3'
      />
    </div>
  )
}

export default FormField