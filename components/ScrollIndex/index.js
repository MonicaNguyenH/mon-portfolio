import { useEffect, useRef } from 'react';
import styles from './ScrollIndex.module.css';

export default function ScrollIndex({ sections }) {
  const popoverRef = useRef(null);

  useEffect(() => {
    const popover = popoverRef.current;

    // Handle link clicks to close the popover
    const links = document.querySelectorAll('ol a');
    links.forEach((link) => {
      link.addEventListener('click', () => popover.hidePopover());
    });

    // Cleanup
    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', () => popover.hidePopover());
      });
    };
  }, []);

  return (
    <>
      <button
        className="trigger"
        popovertarget="index"
        popovertargetaction="toggle"
      >
        <div className="trigger__details">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG content here */}
          </svg>
          <span>
            <span>Index</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </span>
          <span className="progress"></span>
        </div>
      </button>
      <div popover="auto" id="index" ref={popoverRef}>
        <div className="contents">
          <button popovertarget="index" popovertargetaction="hide">
            <div className="trigger__details">
              {/* Repeat SVG content here */}
              <span>
                <span>Index</span>
                {/* Repeat SVG content here */}
              </span>
              <span className="progress"></span>
            </div>
          </button>
          <ol>
            {sections.map((section, index) => (
              <li key={index}>
                <a
                  href={`#${section.id}`}
                  popovertarget="index"
                  popovertargetaction="hide"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}