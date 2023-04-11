import React from 'react'

const InputField = ({title, btnText, handleInput, handleSubmit}) => {
  return (
    <label>
        <input value={title} onChange={(e) => handleInput(e.target.value)} />
        <button onClick={handleSubmit}>{btnText}</button>
    </label>
  )
}

export default InputField