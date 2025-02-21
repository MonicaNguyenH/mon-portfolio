import { useEffect, useState, useRef } from "react";

export default function TypingText () {

    const roles = ["UX/UI Designer", "Digital Designer", "Web Developer"];
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    
    useEffect(() => {
        const currentRole = roles[index];
    
        let timeout;
    
        if (deleting) {
          timeout = setTimeout(() => {
            setText(currentRole.substring(0, charIndex - 1));
            setCharIndex((prev) => prev - 1);
          }, 50);
        } else {
          timeout = setTimeout(() => {
            setText(currentRole.substring(0, charIndex + 1));
            setCharIndex((prev) => prev + 1);
          }, 100);
        }
    
        if (!deleting && charIndex === currentRole.length) {
          setTimeout(() => setDeleting(true), 1000);
        } else if (deleting && charIndex === 0) {
          setDeleting(false);
          setIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
    
        return () => clearTimeout(timeout);
      }, [charIndex, deleting, index, roles]);
    
    return (
        <>
            <p className={styles.role}>
                {text}
                <span className={styles.cursor}>|</span> 
            </p>
        </>
    )
}