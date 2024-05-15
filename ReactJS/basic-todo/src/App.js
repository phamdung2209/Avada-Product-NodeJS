import { useState } from 'react'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'

const App = () => {
    const [todos, setTodos] = useState(() => [
        { text: 'Learn about React' },
        { text: 'Meet friend for lunch' },
        { text: 'Build really cool todo app' },
    ])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E8E8E8',
                height: '100vh',
            }}
        >
            <h1>Todo List</h1>
            {todos.map((todo, index) => (
                <Todo todo={todo} setTodos={setTodos} key={index} />
            ))}
            <TodoForm setTodos={setTodos} />
        </div>
    )
}

export default App
