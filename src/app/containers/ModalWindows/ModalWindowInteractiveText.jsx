import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function ModalWindowInteractiveText(props) {
    const [text, setText] = useState(props.text)
    const interactiveTextState = useSelector((state) => state.interactiveText)
    
    const handleChange = (e) => {
        setText(e.target.value)
    }
    
    const handleSave = () => {
        props.onSave(text, props.chartId)
        props.onClose()
    }

    return (
        <>
            {interactiveTextState.showModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm pointer-events-auto z-50"
                    id="modal-container"
                    onClick={() => null}
                >
                    <div
                        className="modal bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-xl font-bold mb-4">Edit text object</h1>
                        <input
                            type="text"
                            placeholder="Type Some Text"
                            id="interactiveText-input"
                            value={text}
                            onChange={handleChange}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                        />
                        <div className="buttons-class flex justify-between">
                            <button
                                id="save"
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
                            >
                                Save Button
                            </button>
                            <button
                                id="close"
                                onClick={props.onClose}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600"
                            >
                                Close Button
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalWindowInteractiveText