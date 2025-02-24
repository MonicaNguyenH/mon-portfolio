"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./LightBox.module.css";

export default function LightBox() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // The gallery container where items live
    const gallery = container.querySelector(`.${styles.gallery}`);
    // We add the literal class "item" to each so we can reliably query
    const items = container.querySelectorAll(".item");
    const numberOfItems = items.length;
    const angleIncrement = (2 * Math.PI) / numberOfItems;
    const radius = 300;
    let isGalleryOpen = false;

    // Use the gallery's dimensions to calculate the center
    const centerX = gallery.offsetWidth / 2;
    const centerY = gallery.offsetHeight / 2;

    const tl = gsap.timeline();

    items.forEach((item, index) => {
      // Append image element for this item
      const img = document.createElement("img");
      img.src = `/img/gallery/img${index + 1}.jpg`;
      item.appendChild(img);

      // Calculate placement and rotation
      const angle = index * angleIncrement;
      const initialRotation = (angle * 180) / Math.PI - 90;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      gsap.set(item, { scale: 0 });

      tl.to(
        item,
        {
          left: x + "px",
          top: y + "px",
          rotation: initialRotation,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          delay: 1,
        },
        index * 0.1
      );

      // When an item is clicked, animate to open a larger view
      const handleClick = () => {
        if (!isGalleryOpen) {
          isGalleryOpen = true;
          const duplicate = item.cloneNode(true);
          duplicate.style.position = "absolute";
          gallery.appendChild(duplicate);

          gsap.to(Array.from(items).filter((i) => i !== item), {
            scale: 0,
            duration: 0.5,
            ease: "power2.in",
            stagger: 0.05,
          });

          const endRotation =
            initialRotation > 180 ? initialRotation - 360 : initialRotation;

          gsap.to([item, duplicate], {
            rotation: endRotation,
            duration: 0.001,
            onComplete: () => {
              gsap.to([item, duplicate], {
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) scale(5)",
                duration: 1,
                ease: "power2.out",
                delay: 1.25,
              });
            },
          });

          // Function to close the gallery view
          const closeGallery = () => {
            if (isGalleryOpen) {
              gsap.to([item, duplicate], {
                left: x + "px",
                top: y + "px",
                scale: 1,
                rotation: initialRotation,
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                  duplicate.remove();
                  gsap.to(items, {
                    scale: 1,
                    duration: 1,
                    stagger: 0.05,
                    ease: "power2.out",
                  });
                  isGalleryOpen = false;
                  item.removeEventListener("click", closeGallery);
                  duplicate.removeEventListener("click", closeGallery);
                },
              });
            }
          };

          item.addEventListener("click", closeGallery);
          duplicate.addEventListener("click", closeGallery);
        }
      };

      item.addEventListener("click", handleClick);
    });

    // (Optional) Cleanup: If desired, remove event listeners when the component unmounts.
    return () => {
      items.forEach((item) => {
        // For a robust cleanup, consider saving and removing your listener functions.
        // Here we rely on component unmount to clear DOM event handlers.
      });
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.gallery}>
        {Array.from({ length: 15 }).map((_, index) => (
          // We add both the module CSS and a literal "item" class for querySelector
          <div key={index} className={`${styles.item} item`}></div>
        ))}
      </div>
    </div>
  );
}
