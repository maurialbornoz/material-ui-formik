import { useState } from "react";

export const useField = ({type}) => {

    const [value, setValue] = useState('')
    const onChange = (e) => {
        setValue(e.target.value)
    }
    const resetValue = () => {
        setValue('')
    }
    return {
        type, 
        value,
        onChange,
        resetValue
    }
} 