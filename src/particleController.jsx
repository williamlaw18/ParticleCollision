
import React, {useEffect, useState, useRef} from 'react';

const ParticleController = ({setParticles}) => {

    const [settings, setSettings] = useState({
        gravity: true,
    })
    
    const [gravityChecked, setGravityChecked] = useState(true);
    const updateGravity = (value) => {
        setGravityChecked(value)
        console.log(value)
        setSettings(Object.assign({}, settings, {['gravity']: value})) 
    }
    
    useEffect(() => {
        setParticles(settings)
    }, [settings])

    return (
        <section className='particleController'>
        <ul className='particleController__inputwrapper'>
            <div className='particleController__button'>
                <input id="gravity" type="checkbox" checked={gravityChecked} onChange={(input) => updateGravity(input.target.checked)} />
                <label htmlFor="gravity">Gravity</label>
             </div>
        </ul>
        </section>
    )
}

export default ParticleController;