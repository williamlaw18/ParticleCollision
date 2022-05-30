import React, { useEffect, useRef, useState } from "react";

const Objects = (
    {container }) => {
    
    const canvasRef = useRef()
    const objects = useRef([])

    const animateRef = useRef();
    
    const [canvasHeight, setCanvasHeight] = useState(500);
    const [canvasWidth, setCanvasWidth] = useState(500);

    const initCanvas = () => {
        setCanvasArea();
        createObject(20, 20, 150, 150, [0.3, 0.5])
        window.addEventListener('resize', setCanvasArea);
        animateRef.current = requestAnimationFrame(animate);
    }

    //Sets canvas area to container size
    const setCanvasArea = () => {
        if (container.current != null){
            setCanvasHeight(container.current.offsetHeight)
            setCanvasWidth(container.current.offsetWidth);
        }
    }

    //adds object to list
    const createObject = (x, y, width, height, vector) => {
        const object = {
            x: x,
            y: y,
            width: width,
            height: height,
            vector: vector
        };
        objects.current = [...objects.current, object]
    }

    //draws object on canvas
    const drawObjects = () => {
        const ctx = canvasRef.current?.getContext('2d')
        ctx.clearRect(0, 0, canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        
        objects.current.forEach((object) => {

            object.x = object.x + object.vector[0]
            object.y = object.y + object.vector[1]

            ctx.beginPath();
            ctx.rect(object.x, object.y, object.width, object.height);
            ctx.stroke();
        })
    };

    //Draw animation frames
    const animate = () => {
        drawObjects();
        animateRef.current = requestAnimationFrame(animate);
    }

    //Component update
    useEffect(() => {     
        initCanvas();
        return () => {
            window.removeEventListener('resize', setCanvasArea);
            cancelAnimationFrame(animateRef.current);
        };
    }, []);

    return (
        <React.Fragment>
            <canvas
                ref={canvasRef}
                width={`${canvasWidth}px`}
                height={`${canvasHeight}px`}
            />
        </React.Fragment>
    );
}

export default Objects
