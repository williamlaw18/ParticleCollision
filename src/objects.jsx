import React, { useEffect, useRef, useState } from "react";

const Objects = (
    {container }) => {
    
    const canvasRef = useRef()
    const objects = useRef([])
    const gravity = useRef(0.1);

    const animateRef = useRef();
    
    const [canvasHeight, setCanvasHeight] = useState(500);
    const [canvasWidth, setCanvasWidth] = useState(500);

    const initCanvas = () => {
        setCanvasArea();
        createCircle(100, 400, 70, 3, -8, 0.2)
        window.addEventListener('resize', setCanvasArea);
        animateRef.current = requestAnimationFrame(animate);
    }

    //Strips floating point number
    function strip(number) {
        return (parseFloat(number.toFixed(2)));
    }

    //Sets canvas area to container size
    const setCanvasArea = () => {
        if (container.current != null){
            setCanvasHeight(container.current.offsetHeight)
            setCanvasWidth(container.current.offsetWidth);
        }
    }

    //adds object to list
    const createCircle = (x, y, radius, vx, vy, cor) => {
        const object = {
            type: 'circle',
            x: x,
            y: y,
            radius: radius,
            vx: vx,
            vy: vy,
            cor: cor,
            isColliding: false
        };
        objects.current = [...objects.current, object]
    }

    const detectCollisions = () => {

        let obj2;
        // Reset collision state of all objects
        objects.current.forEach((object) => {
            object.isColliding = false;
        });
    
        // Start checking for collisions
        objects.current.forEach((obj1, index) => {
            obj1.vx = strip(obj1.vx)
            obj1.vy = strip(obj1.vy)
            obj1.x = strip(obj1.x)
            obj1.y = strip(obj1.y)


            for (let j = index + 1; j < objects.current.length; j++){
                obj2 = objects.current[j];
                
                // Compare object1 with object2
                let dist = strip(Math.sqrt( Math.pow((obj1.x-obj2.x), 2) + Math.pow((obj1.y-obj2.y), 2) ));

                if (dist <= (obj1.radius + obj2.radius)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;

                    //Finds collision normal from two object vectors
                    let vCollision = {x: strip(obj2.x - obj1.x), y: strip(obj2.y - obj1.y)};
                    let vCollisionNorm = {x: strip(vCollision.x / dist), y: strip(vCollision.y / dist)};

                    //calculates change of speed based on the comparrison of the two vectors
                    let vRelativeVelocity = {x: strip(obj1.vx - obj2.vx), y: strip(obj1.vy - obj2.vy)};
                    let speed = strip(vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y);

                    //Apply loss of velocity
                    // speed *= Math.min(obj1.cor, obj2.cor);

                    //calcultes the mass impulse that effects the change in velocity
                    let impulse = strip(2 * speed / (obj1.radius + obj2.radius));

                    obj1.vx = strip(obj1.vx - (impulse * obj2.radius * vCollisionNorm.x));
                    obj1.vy = strip(obj1.vy - (impulse * obj2.radius * vCollisionNorm.y));
                    obj2.vx = strip(obj2.vx + (impulse * obj1.radius * vCollisionNorm.x));
                    obj2.vy = strip(obj2.vy + (impulse * obj1.radius * vCollisionNorm.y));
                }
            }

            //Sets coefficient of restitution for bounding box
            let cor = 0.95
            //Applies change in vector direction based on bounding box collision
            if (obj1.y + obj1.radius >= canvasRef.current.offsetHeight || obj1.y - obj1.radius <= 0) obj1.vy = strip(-obj1.vy) * cor;
            if (obj1.x + obj1.radius >= canvasRef.current.offsetWidth || obj1.x - obj1.radius <= 0) obj1.vx = strip(-obj1.vx) * cor;

            // Apply acceleration
            if (obj1.y <= canvasRef.current.offsetHeight - obj1.radius) obj1.vy = obj1.vy + gravity.current;
        });
    }

    //draws object on canvas
    const drawObjects = () => {
        const ctx = canvasRef.current?.getContext('2d')
        ctx.clearRect(0, 0, canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        objects.current.forEach((object) => {

            object.x = strip(object.x) + strip(object.vx)
            object.y = strip(object.y) + strip(object.vy)

            ctx.beginPath();
            ctx.arc(object.x, object.y, object.radius, 0, 2 * Math.PI, false)
            object.isColliding ? ctx.fillStyle = "red": ctx.fillStyle = "lightblue"
            ctx.fill();
            ctx.stroke();
        })
        
    };

    //Draw animation frames
    const animate = () => {
        detectCollisions();
        drawObjects();
        animateRef.current = requestAnimationFrame(animate);
    }

    // setInterval(() => {
    //     animate()
    // }, 100)

    const handleCanvasClick = (e) => {
        createCircle(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 30, -0.6, 0.4, 0.8)
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
