import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notes() {
    const [value, setValue] = useState("");
    const [list, setList] = useState([]);

    const fetchNotes = async () => {
        const response = await axios.get('https://react-js-task-backend.onrender.com/notes');
        setList(response.data);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const HandleAdd = async () => {
        if (value.trim()) {
            const date = new Date().toISOString().slice(0, 19).replace("T", " ");
            const response = await axios.post('https://react-js-task-backend.onrender.com/notes', { value, date });
            setList([...list, response.data]);
            setValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            HandleAdd();
        }
    };

    const HandleDelete = async (itemId) => {
        await axios.delete(`https://react-js-task-backend.onrender.com/notes/${itemId}`);
        setList(list.filter(item => item.id !== itemId));
    };

    return (
        <div className="flex flex-col items-center mt-12">
            <div className="w-4/5 max-w-5xl text-center">
                <h1 className="text-2xl font-bold mb-6">Notes</h1>

                <form onSubmit={(e) => e.preventDefault()} className="mb-6">
                    <input
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        value={value}
                        className="w-4/5 p-2 border-2 max-w-md border-gray-300 rounded-md"
                        placeholder="Enter a Note..."
                    />
                    <button
                        onClick={HandleAdd}
                        type="button"
                        className="ml-2 p-2 px-5 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Add
                    </button>
                </form>

                <div className="flex flex-wrap items-start gap-4">
                    {list.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-gray-100 p-4 rounded-lg shadow-md h-auto break-words inline-block"
                        >
                            <div className="text-gray-800 font-semibold mb-1 mt-3">
                                {item.value}
                            </div>
                            <div className="text-gray-500 text-sm mb-4">
                                {new Date(item.date).toLocaleString()}                            </div>
                            <button
                                onClick={() => HandleDelete(item.id)}
                                className="absolute top-2 right-2"
                            >
                                <img
                                    width="20"
                                    height="20"
                                    src="https://img.icons8.com/ios-glyphs/30/filled-trash.png"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Notes;
