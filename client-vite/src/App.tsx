import { useState } from "react";
import Documents from "./components/Documents";

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1 className="text-3xl font-bold underline">Vite + React</h1>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <Documents />
        </>
    );
}

