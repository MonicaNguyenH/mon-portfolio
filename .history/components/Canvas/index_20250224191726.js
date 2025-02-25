import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import styles from './Canvas.module.css';

export default function Canvas() {
    const canvasRef = useRef(null);
    const engineRef = useRef(Matter.Engine.create());
    const itemsRef = useRef([]);
    const lastMouseXRef = useRef(-1);
    const lastMouseYRef = useRef(-1);

    useEffect(() => {
        const { Engine, World, Bodies, Body } = Matter;
        const engine = engineRef.current;
        const items = itemsRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            engine.world.gravity.y = 0;

            addBoundaries();

            for (let i = 0; i < 12; i++) {
                let x = Math.random() * (canvas.width - 200) + 100;
                let y = Math.random() * (canvas.height - 200) + 100;
                items.push(new Item(x, y, `/img/canvas/img${i + 1}.png`));
            }
        };

        const addBoundaries = () => {
            const thickness = 50;
            World.add(engine.world, [
                Bodies.rectangle(canvas.width / 2, -thickness / 2, canvas.width, thickness, {
                    isStatic: true,
                }),
                Bodies.rectangle(canvas.width / 2, canvas.height + thickness / 2, canvas.width, thickness, {
                    isStatic: true,
                }),
                Bodies.rectangle(-thickness / 2, canvas.height / 2, thickness, canvas.height, {
                    isStatic: true,
                }),
                Bodies.rectangle(canvas.width + thickness / 2, canvas.height / 2, thickness, canvas.height, {
                    isStatic: true,
                }),
            ]);
        };

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'black';
            context.fillRect(0, 0, canvas.width, canvas.height);

            Engine.update(engine);
            items.forEach((item) => item.update(context));
            requestAnimationFrame(draw);
        };

        const mouseMoved = (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const lastMouseX = lastMouseXRef.current;
            const lastMouseY = lastMouseYRef.current;

            if (dist(mouseX, mouseY, lastMouseX, lastMouseY) > 10) {
                lastMouseXRef.current = mouseX;
                lastMouseYRef.current = mouseY;

                items.forEach((item) => {
                    if (dist(mouseX, mouseY, item.body.position.x, item.body.position.y) < 150) {
                        let forceMagnitude = 3;
                        Body.applyForce(item.body, {
                            x: item.body.position.x,
                            y: item.body.position.y,
                        }, {
                            x: Math.random() * forceMagnitude * 2 - forceMagnitude,
                            y: Math.random() * forceMagnitude * 2 - forceMagnitude,
                        });
                    }
                });
            }
        };

        const dist = (x1, y1, x2, y2) => {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
        };

        class Item {
            constructor(x, y, imagePath) {
                let options = {
                    frictionAir: 0.075,
                    restitution: 0.25,
                    density: 0.002,
                    angle: Math.random() * Math.PI * 2,
                };

                this.body = Bodies.rectangle(x, y, 100, 200, options);
                World.add(engine.world, this.body);

                this.image = new Image();
                this.image.src = imagePath;
            }

            update(context) {
                const pos = this.body.position;
                const angle = this.body.angle;

                context.save();
                context.translate(pos.x, pos.y);
                context.rotate(angle);
                context.drawImage(this.image, -50, -100, 100, 200);
                context.restore();
            }
        }

        setup();
        draw();

        window.addEventListener('mousemove', mouseMoved);

        return () => {
            window.removeEventListener('mousemove', mouseMoved);
        };
    }, []);

    return (
        <>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1>Monicaaa</h1>
                </div>
                <canvas ref={canvasRef} className={styles.canvas}></canvas>
            </div>
        </>
    );
}