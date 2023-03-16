import React from 'react'

const InputField = ({text, btnText, handleInput, handleSubmit}) => {
  return (
    <label>
        <input value={text} onChange={(e) => handleInput(e.target.value)} />
        <button onClick={handleSubmit}>{btnText}</button>
    </label>
  )
}

export default InputField