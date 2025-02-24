"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./LightBox.module.css";

export default function LightBox() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return; // Just in case ref isn't attached

    // Select the .gallery element inside the container
    const gallery = container.querySelector(`.${styles.gallery}`);
    if (!gallery) return; // If we can't find the gallery, exit

    // The items to animate (we add a literal "item" class in JSX)
    const items = gallery.querySelectorAll(".item");
    const numberOfItems = items.length;
    const angleIncrement = (2 * Math.PI) / numberOfItems;
    const radius = 300;
    let isGalleryOpen = false;

    // Calculate the center of the gallery container
    const centerX = gallery.offsetWidth / 2;
    const centerY = gallery.offsetHeight / 2;

    const tl = gsap.timeline();

    items.forEach((item, index) => {
      // Append an image element
      const img = document.createElement("img");
      img.src = `/img/gallery/img${index + 1}.png`;
      item.appendChild(img);

      // Calculate the position/rotation for this item
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

      // Handle click to open an enlarged version
      const handleClick = () => {
        if (!isGalleryOpen) {
          isGalleryOpen = true;

          // Duplicate this item
          const duplicate = item.cloneNode(true);
          duplicate.style.position = "absolute";
          gallery.appendChild(duplicate);

          // Scale down other items
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

          // Function to close the enlarged item
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

                  // Remove listeners
                  item.removeEventListener("click", closeGallery);
                  duplicate.removeEventListener("click", closeGallery);
                },
              });
            }
          };

          // Clicking again closes the gallery
          item.addEventListener("click", closeGallery);
          duplicate.addEventListener("click", closeGallery);
        }
      };

      // Attach the click handler
      item.addEventListener("click", handleClick);
    });

    // Optional: If you want to clean up event listeners when unmounting
    return () => {
      // items.forEach((item) => {
      //   item.removeEventListener("click", handleClick);
      // });
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.gallery}>
        {Array.from({ length: 15 }).map((_, index) => (
          // Use both the module class and a literal class "item" so we can query it
          <div key={index} className={`${styles.item} item`}></div>
        ))}
      </div>
    </div>
  );
}
