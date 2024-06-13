import { useState } from 'react'

function App() {
    const [count, setCount] = useState<number>(0)

    return (
        <>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </>
    )
}

export default App
