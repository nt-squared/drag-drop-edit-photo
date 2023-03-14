import React from 'react'

export default function Slider({ min, max, value, unit, handleChange }) {
    return (
        <div className="slider-container">
            <p>{value} {unit}</p>
            <input
                type="range"
                className="slider"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}
