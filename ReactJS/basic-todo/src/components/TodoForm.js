import React, { useState } from 'react'

const TodoForm = ({ setTodos }) => {
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (value.trim().length === 0) {
            return
        }
        setTodos((prev) => [...prev, { text: value }])
        setValue('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    marginBottom: '10px',
                }}
            />
        </form>
    )
}

export default TodoForm
