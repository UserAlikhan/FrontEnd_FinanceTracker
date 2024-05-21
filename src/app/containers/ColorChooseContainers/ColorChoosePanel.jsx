import React from 'react'
import { useDispatch } from 'react-redux';
import { selectColor } from '../../../state-manager/choosenColor/choosenColorSlice';

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];

export const ColorChoosePanel = () => {
    const dispatch = useDispatch()
    
    const onColorSelect = (color) => {
        dispatch(selectColor(color))
    }
    
    return (
        <div className=' absolute left-0 top-15 z-10 flex flex-col justify-center items-center px-2 w-min h-min bg-[#e5e7ed]'>
            {colors.map((color, index) => (
                <button
                    key={index}
                    style={{
                        backgroundColor: color,
                        width: '30px',
                        height: '30px',
                        marginBottom: '5px',
                        border: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: color,
                        },
                    }}
                    onClick={() => onColorSelect(color)}
                />
            ))}
        </div>
    )
}

export default ColorChoosePanel