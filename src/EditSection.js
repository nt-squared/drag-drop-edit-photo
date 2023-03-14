import { useState } from 'react'
import Slider from './Slider';

const DEFAULT_OPTIONS = [
    {
        name: 'Blur',
        property: 'blur',
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: 'px',
    },
    {
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        range: {
            min: 0,
            max: 500,
        },
        unit: '%',
    },
    {
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        range: {
            min: 0,
            max: 500,
        },
        unit: '%',
    },
    {
        name: 'Grayscale',
        property: 'grayscale',
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: '%',
    },
    {
        name: 'Hue Rotate',
        property: 'hue-rotate',
        value: 0,
        range: {
            min: 0,
            max: 360,
        },
        unit: 'deg',
    },
    {
        name: 'Invert',
        property: 'invert',
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: '%',
    },
    {
        name: 'Opacity',
        property: 'opacity',
        value: 100,
        range: {
            min: 0,
            max: 100,
        },
        unit: '%',
    },
    {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: '%',
    },
    {
        name: 'Sepia',
        property: 'sepia',
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: '%',
    },

]

export default function EditSection({ children }) {
    const [options, setOptions] = useState(DEFAULT_OPTIONS)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedOption = options[selectedIndex]

    function handleSliderChange({ target }) {
        setOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if (index !== selectedIndex) return option

                return { ...option, value: target.value }
            })
        })
    }

    function getImageStyle() {
        return {
            filter: options.map(option => `${option.property}(${option.value}${option.unit})`).join(' ')
        }
    }

    return (
        <>
            <div className="preview" style={getImageStyle()}>{children}</div>
            <div className="sidebar">
                <div className="sidebar-list">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            className={`sidebar-item ${index === selectedIndex ? 'active' : ''}`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
                <Slider
                    min={selectedOption.range.min}
                    max={selectedOption.range.max}
                    value={selectedOption.value}
                    unit={selectedOption.unit}
                    handleChange={handleSliderChange}
                />
            </div>
        </>
    )
}
