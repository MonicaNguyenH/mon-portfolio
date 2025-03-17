"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ProjectHeaderSC2.module.css";
import ButtonFilledBlack from "../ButtonFilledBlack";

export default function ProjectHeaderSC2({ name, description, img, introduction, tools, date, buttonLink1, buttonLink2, buttonText1, buttonText2 }) {

  return (
    <div className={styles.main}>
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={img} alt={name} />
      <div className={styles.intro}>
        <div>
            <p>{introduction}</p>
            <div className={styles.button}>
              <ButtonFilledBlack href={buttonLink1}>
                  {buttonText1}
              </ButtonFilledBlack>
              <ButtonFilledBlack href={buttonLink2}>
                  {buttonText2}
              </ButtonFilledBlack>
            </div>
        </div>
        <div className={styles.intro__detail}>
          <div className={styles.detail__toolsContainer}>
            {tools.map((tool, index) => (
              <p key={index} className={styles.detail__tool}>{tool}</p>
            ))}
          </div>
          <p className={styles.detail__date}>{date}</p>
        </div>
      </div>
    </div>
  );
}
