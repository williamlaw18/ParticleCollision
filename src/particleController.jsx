
import React, {useEffect, useState, useRef} from 'react';

import './styles/particleController.scss';

const ParticleController = ({setParticles}) => {

    const [settings, setSettings] = useState({
        gravity: 0.1,
        rate: 500,
        colors: [],
        border: true,
        collisions: true,
        container: true,
        minRadius: 10,
        maxRadius: 100,
        vy: -0.4,
        vx: 1,
        maxObjects: 300
    })
    
    const updateGravity = (value) => {
        const multiple = 500;
        const output = ((parseInt(value) / multiple));
        setSettings(Object.assign({}, settings, {['gravity']: output})) 
    }

    const updateVelocityX = (value) => {
        const base = 50
        const multiple = 5;
        const output = -((parseInt((value - base) / multiple)));

        setSettings(Object.assign({}, settings, {['vx']: output}))
    }

    const updateVelocityY = (value) => {
        const base = 50
        const multiple = 5;
        const output = ((parseInt((value - base) / multiple)));

        setSettings(Object.assign({}, settings, {['vy']: output}))
    }

    const updateRate = (value) => {
        const multiple = 10;
        const output = (((100 * multiple) - (parseInt(value)) * multiple));
        setSettings(Object.assign({}, settings, {['rate']: output}))
    }

    const [collisionsChecked, setCollisionsChecked] = useState(true);
    const updateCollisions = (value) => {
        setCollisionsChecked(value)
        setSettings(Object.assign({}, settings, {['collisions']: value})) 
    }

    const [containerChecked, setContainerChecked] = useState(true);
    const updateContainer = (value) => {
        setContainerChecked(value)
        setSettings(Object.assign({}, settings, {['container']: value})) 
    }

    const [borderChecked, setBorderChecked] = useState(true);
    const updateBorder = (value) => {
        setBorderChecked(value)
        setSettings(Object.assign({}, settings, {['border']: value})) 
    }

    const [colorList, setColorList] = useState([]);
    const colors = useRef([]);
    const [colorID, setColorID] = useState(0);
    const [colorWheel, setColorWheel] = useState('#FFFFFF');
    const addColor = (value) => {
        const color = {
            id: colorID,
            color: colorWheel
        }
        colors.current = [...colorList, color]
        setColorList([...colorList, color])
        setColorID(colorID + 1);
        setColorWheel('#FFFFFF');
        updateColors(colors.current)
    }

    const removeColor = (value) => {
        const filterColor = (colorList.filter((color) => color.id != value.id));
        setColorList(filterColor);
        colors.current = filterColor;
        updateColors(colors.current)
    }
    
    const updateColors = (value) => {
        const sanitizedColors = value.map((item) => {
            return(item.color)
        })
        setSettings(Object.assign({}, settings, {['colors']: sanitizedColors}))
    }
    
    useEffect(() => {
        setParticles(settings)
    }, [settings])

    return (
        <section className='particleController'>
        <ul className='particleController__inputwrapper'>
                <li className='particleController__buttons'>    
                    <div className='particleController__button'>
                        <input id="border" type="checkbox" checked={borderChecked} onChange={(input) => updateBorder(input.target.checked)} />
                        <label htmlFor="border">Border</label>
                    </div>
                    <div className='particleController__button'>
                        <input id="collisions" type="checkbox" checked={collisionsChecked} onChange={(input) => updateCollisions(input.target.checked)} />
                        <label htmlFor="collisions">Collisions</label>
                    </div>
                    <div className='particleController__button'>
                        <input id="container" type="checkbox" checked={containerChecked} onChange={(input) => updateContainer(input.target.checked)} />
                        <label htmlFor="container">Container</label>
                    </div>
                </li>
                <li className='particleController__input'>
                    <input id="gravity" type="range" onChange={(input) => updateGravity(input.target.value)} />
                    <label htmlFor="gravity">Gravity</label>
                </li>
                <li className='particleController__input'>
                    <input id="rate" type="range" onChange={(input) => updateRate(input.target.value)} />
                    <label htmlFor="rate">Rate of Appearance</label>
                </li>
                <li className='particleController__input'>
                    <input id="yMove" type="range" onChange={(input) => updateVelocityY(input.target.value)} />
                    <label htmlFor="yMove">Y Axis Velocity</label>
                </li>
                 <li className='particleController__input'>
                    <input id="xMove" type="range" onChange={(input) => updateVelocityX(input.target.value)} />
                    <label htmlFor="xMove">X Axis Velocity</label>
                </li>

                <li className='particleController__color'>
                    <div className='particleController__color--button'>
                        <input type="color" value={colorWheel} onChange={(input) => setColorWheel(input.target.value)} />
                        <button onClick={() => addColor()}>Add colour +</button>
                    </div>
                    <ul id="colors">
                        {colorList.map((item, i) => {
                            return(
                                <li key={i} className='particleController__color--item'>
                                    <label htmlFor={`color-${item.color}-${item.id}`} style={{backgroundColor: item.color}}>Remove</label>
                                    <input type={'button'} id={`color-${item.color}-${item.id}`} value={item.color} onClick={() => removeColor(item)}/>
                                </li>
                            )
                        })}
                    </ul>
                </li>
        </ul>
        </section>
    )
}

export default ParticleController;