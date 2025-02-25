import styles from './Canvas.module.css';

export default function Canvas() {
    const Engine = Matter.Engine;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Body = Matter.Body;

    let engine;
    let items = [];
    let lastMouseX = -1;
    let lastMouseY = -1;

    function setup() {
        createCanvas(window.innerWidth, window.innerHeight);
        engine = Engine.create();
        engine.world.gravity.y = 0;

        addBoundaries();

        for (let i = 0; i < 12; i++) {
            let x = random(100, width - 100);
            let y = random(100, height - 100);
            items.push(new items(x, y, `/img/canvas/img${i + 1}.png`))
        }
    }

    function addBoundaries() {
        const thickness = 50;
        World.add(engine.world, [
            Bodies.rectangle(width / 2, -thickness / 2, width, thickness, {
                isStatic: true,    
            }),
            Bodies.rectangle(
                width / 2, 
                height + thickness / 2, 
                width,
                thickness, 
            {
                isStatic: true,    
            }),
            Bodies.rectangle(-thickness / 2, height / 2, thickness, height, {
                isStatic: true,    
            }),
            Bodies.rectangle(
                width + thickness / 2, 
                height / 2, 
                thickness, 
                height, 
            {
                isStatic: true,    
            })
        ])
    }

    function draw() {
        background("black");
        Engine.update(engine);
        items.forEach((item) => ite.update());
    }

    class Item {
        constructor(x, y, imagePath) {
            let options = {
                frictionAir: 0.075,
                restitution: 0.25,
                density: 0.002,
                angle: Math.random() + Math.PI * 2,
            };

            this.body = Bodies.rectangle(x, y, 100, 200, options);
            World.add(engine.world, this.body);

            this.div = document.createElement("div");
            this.div.className = "item";
            this.div.style.left = `${this.body.position.x - 50}px`;
            this.div.style.top = `${this.body.position.y - 100}px`;
            const img = document.createElement("img");
            img.src = imagePath;
            this.div.appendChild(img);
            document.body.appendChild(this.div);
        }
    }

    return (
        <>
        <div className={styles.main}>
            <div className={styles.header}>
                <h1>Monicaaa</h1>
            </div>
        </div>
            
        </>
    )
}