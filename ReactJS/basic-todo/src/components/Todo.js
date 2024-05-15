import React from 'react'

const Todo = ({ todo, setTodos }) => {
    const handleDeleteTodo = () => {
        setTodos((prev) => prev.filter((t) => t.text !== todo.text))
    }

    return (
        <div
            style={{
                backgroundColor: 'white',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '10px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
                display: 'flex',
                gap: '10px',
            }}
        >
            <span
                style={{
                    textDecoration: todo?.completed ? 'line-through' : 'none',
                    flexGrow: 1,
                }}
            >
                {todo.text}
            </span>

            <button
                style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '10px',
                }}
                onClick={() => {
                    setTodos((prev) => {
                        return prev.map((t) => {
                            if (t.text === todo.text) {
                                return { ...t, completed: !t.completed }
                            }
                            return t
                        })
                    })
                }}
            >
                complete
            </button>
            <button onClick={handleDeleteTodo}>&times;</button>
        </div>
    )
}

export default Todo
