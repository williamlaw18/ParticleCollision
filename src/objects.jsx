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
        createCircle(100, 400, 50, 1, -0.3)
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
    const createCircle = (x, y, radius, vx, vy) => {
        const object = {
            type: 'circle',
            x: x,
            y: y,
            radius: radius,
            vx: vx,
            vy: vy,
            col: vx, vy,
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
            for (let j = index + 1; j < objects.current.length; j++){
                obj2 = objects.current[j];
                
                // Compare object1 with object2
                let dist = Math.sqrt( Math.pow((obj1.x-obj2.x), 2) + Math.pow((obj1.y-obj2.y), 2) );

                if (dist <= (obj1.radius + obj2.radius)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;

                    let vCollision = {x: parseFloat(((obj2.x - obj1.x)).toFixed(2)), y: parseFloat(((obj2.y - obj1.y)).toFixed(2))};
                    let vCollisionNorm = {x: vCollision.x / dist, y: vCollision.y / dist};

                    let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
                    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

                    obj1.vx -= (speed * vCollisionNorm.x);
                    obj1.vy -= (speed * vCollisionNorm.y);
                    obj2.vx += (speed * vCollisionNorm.x);
                    obj2.vy += (speed * vCollisionNorm.y);
                }
            }

            if (obj1.y + obj1.radius >= canvasRef.current.offsetHeight || obj1.y - obj1.radius <= 0) obj1.vy = -obj1.vy
            if (obj1.x + obj1.radius >= canvasRef.current.offsetWidth || obj1.x - obj1.radius <= 0) obj1.vx = -obj1.vx
        });
    }

    //draws object on canvas
    const drawObjects = () => {
        const ctx = canvasRef.current?.getContext('2d')
        ctx.clearRect(0, 0, canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        
        objects.current.forEach((object) => {

            object.x = object.x + object.vx
            object.y = object.y + object.vy
            object.x = (parseFloat(object.x.toFixed(2)))
            object.y = (parseFloat(object.y.toFixed(2)))

            ctx.beginPath();
            ctx.arc(object.x, object.y, object.radius, 0, 2 * Math.PI, false)
            object.isColliding ? ctx.fillStyle = "red": ctx.fillStyle = "lightblue"
            ctx.fill();
            ctx.stroke();

            //Visual vector direction
            // ctx.beginPath();
            // ctx.moveTo(object.x, object.y);
            // ctx.lineTo(object.x + (object.vx * 100), object.y + (object.vy * 100))
            // ctx.stroke()
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
    // }, 50)


    const handleCanvasClick = (e) => {
        createCircle(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 50, -0.6, 0.8)
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
