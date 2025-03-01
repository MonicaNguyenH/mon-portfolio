import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import styles from './Canvas.module.css';

export default function Canvas() {
    const canvasRef = useRef(null);
    const itemsRef = useRef([]);
    const engineRef = useRef(null);
    const lastMouseXRef = useRef(-1);
    const lastMouseYRef = useRef(-1);

    useEffect(() => {
        const Engine = Matter.Engine;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Body = Matter.Body;

        let engine;
        let items = [];
        engine = Engine.create();
        engine.world.gravity.y = 0;
        engineRef.current = engine;

        addBoundaries();

        for (let i = 0; i < 12; i++) {
            let x = random(100, window.innerWidth - 100);
            let y = random(100, window.innerHeight - 100);
            items.push(new Item(x, y, `/img/canvas/img${i + 1}.jpg`));
        }
        itemsRef.current = items;

        const render = () => {
            Matter.Engine.update(engine);
            items.forEach((item) => item.update());
            requestAnimationFrame(render);
        };

        render();

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const random = (min, max) => Math.random() * (max - min) + min;

    const addBoundaries = () => {
        const thickness = 50;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const width = window.innerWidth;
        const height = window.innerHeight;

        World.add(engineRef.current.world, [
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
                }
            ),
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
                }
            ),
        ]);
    };

    class Item {
        constructor(x, y, imagePath) {
            const Bodies = Matter.Bodies;
            const World = Matter.World;

            let options = {
                frictionAir: 0.075,
                restitution: 0.25,
                density: 0.002,
                angle: Math.random() * Math.PI * 2,
            };

            this.body = Bodies.rectangle(x, y, 100, 200, options);
            World.add(engineRef.current.world, this.body);

            this.div = document.createElement('div');
            this.div.className = styles.item;
            this.div.style.left = `${this.body.position.x - 50}px`;
            this.div.style.top = `${this.body.position.y - 100}px`;
            const img = document.createElement('img');
            img.src = imagePath;
            this.div.appendChild(img);
            canvasRef.current.appendChild(this.div); // Append to the canvas container
        }

        update() {
            this.div.style.left = `${this.body.position.x - 50}px`;
            this.div.style.top = `${this.body.position.y - 100}px`;
            this.div.style.transform = `rotate(${this.body.angle}rad)`;
        }
    }

    const handleMouseMove = (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (Math.sqrt((mouseX - lastMouseXRef.current) ** 2 + (mouseY - lastMouseYRef.current) ** 2) > 10) {
            lastMouseXRef.current = mouseX;
            lastMouseYRef.current = mouseY;

            itemsRef.current.forEach((item) => {
                if (Math.sqrt((mouseX - item.body.position.x) ** 2 + (mouseY - item.body.position.y) ** 2) < 150) {
                    let forceMagnitude = 0.01;
                    Matter.Body.applyForce(
                        item.body,
                        {
                            x: item.body.position.x,
                            y: item.body.position.y,
                        },
                        {
                            x: (mouseX - item.body.position.x) * forceMagnitude,
                            y: (mouseY - item.body.position.y) * forceMagnitude,
                        }
                    );
                }
            });
        }
    };

    return (
        <div className={styles.main} ref={canvasRef}>
            <div className={styles.header}>
                <h1>Monicaaa</h1>
            </div>
        </div>
    );
}