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
        createCircle(100, 100, 50, [0.3, 0.5])
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
    const createCircle = (x, y, radius, vector) => {
        const object = {
            type: 'circle',
            x: x,
            y: y,
            radius: radius,
            vector: vector,
            isColliding: false
        };
        objects.current = [...objects.current, object]
    }

    const circIntersect = (x1, y1, r1, x2, y2, r2) => {
        // Calculate the distance between the two circles
        let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
        // if distance is smaller or equal to the sum two radius
        return squareDistance <= ((r1 + r2) * (r1 + r2))
    }

    const detectCollisions = () => {
        let obj2;
        // Reset collision state of all objects
        objects.current.forEach((object) => {
            object.isColliding = false;
        });
    
        // Start checking for collisions
        objects.current.forEach((obj1, index) => {
            for (let j = index + 1; j < objects.current.length; j++){
                obj2 = objects.current[j];
    
                // Compare object1 with object2
                if (circIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                }
            }
        });
    }

    //draws object on canvas
    const drawObjects = () => {
        const ctx = canvasRef.current?.getContext('2d')
        ctx.clearRect(0, 0, canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        
        objects.current.forEach((object) => {

            object.x = object.x + object.vector[0]
            object.y = object.y + object.vector[1]

            console.log(object.isColliding)

            ctx.beginPath();
            ctx.arc(object.x, object.y, object.radius, 0, 2 * Math.PI, false)
            ctx.stroke();
        })
        
    };

    //Draw animation frames
    const animate = () => {
        detectCollisions();
        drawObjects();
        // animateRef.current = requestAnimationFrame(animate);
    }
    setInterval(() => {
        animate()
    }, 100);

    const handleCanvasClick = (e) => {
        createCircle(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 50, [-0.3, 0.5])
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
                onMouseDown={handleCanvasClick}
                ref={canvasRef}
                width={`${canvasWidth}px`}
                height={`${canvasHeight}px`}
            />
        </React.Fragment>
    );
}

export default Objects
