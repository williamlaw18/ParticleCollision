# A Javascript Particle Collider!

A Particle collision system made in Javascript, React and HTML canvas.

## Vite

This project uses Vite as a front end bundler and tooling.
I went with vite because it is so simple to spin up a project as well as being incredibly lightweight.

### Usage

`npm install` - Install node packages
`npm start` - Starts the project on a local host

## This project intends to implement

- Generate a dynamic array of particles.
- Animate their position on a HTML canvas.
- Calculate the movement vectors and velocity of each particle.
- Detect a collision between different object shapes.
- Find the sum vector normal between two colliding particles and apply a new vector in the relevant direction.
- Conserve momentum between the collision of particles.
- Apply a gravitational force.
- Particle settings controller

## Particle Controller

- Gravity - Toggles gravity

## How it works (currently)

UseEffect is run every time the `object.jsx` component settings are updated.
This will reset the settings of the canvas size and particle settings.

Performing a mouse click on the canvas will run a function that will handle the `createCircle` method.
This adds a circle to the objects array with the mouse position and vector values assigned.

The `drawObjects` method is run on an `requestAnimationFrame` cycle which is called every frame by the browser.
This accesses the HTML canvas and draws each shape based on its settings in that particular cycle. 

The `detectCollisions` method is also run on the `requestAnimationFrame` cycle.
This compares the distance between the objects and updates the values of particles
When a collision is made, a normalised vector is calculated as the negative sum of the two particle vectors, then divided by the distance between them.
The collision normal is then used to calculate the corrosponding velocity for each particle.
The impulse is then calculated from the speed which is used to determine the loss of velocity from each collision depending on the size of the two particles.
Finally, a gravity vector is added to each particle every frame when the particle is not collided with the floor.