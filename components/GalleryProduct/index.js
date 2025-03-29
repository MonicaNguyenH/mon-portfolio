import styles from './GalleryProduct.module.css'

export default function GalleryProduct() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.blurry__prev}>
                    <img className={styles.img} src="/img/gallery/img1.webp" alt="Blurry Img" />
                    <div className={styles.overlay}>

                    </div>
                </div>
                <div className={`${styles.col} ${styles.site__info}`}>
                    <div className={styles.header}>
                        <h1 className={styles.h1}>Hello this is the header section</h1>
                    </div>
                    <div className={styles.copy}>
                        <p className={styles.p}>
                        A disco platypus wearing sunglasses tap-danced across the moonlit cheesecake while reciting Shakespeare in Klingon. Meanwhile, a suspiciously philosophical toaster debated the meaning of breakfast with a slice of jam-covered toast who claimed to be the rightful heir to the throne of Refrigerator Kingdom.
                        </p>
                    </div>
                </div>
                <div className={`${styles.col} ${styles.project__preview}`}>
                    <div className={styles.project__details}>
                        <div className={styles.title}>
                            <h1 className={styles.h1}>This is a title</h1>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.p}>
                            The council of intergalactic hamsters convened beneath the sacred broccoli tree to discuss the urgent matter of exploding marshmallow meteors. Captain Snugglepaws, leader of the rebellion, raised his glittery spoon staff and proclaimed, “No more salad Wednesdays!” The spaghetti clouds wept in approval.
                            </p>
                        </div>
                        <div className={styles.credits}><p className={styles.p}>Credits</p></div>
                        <div className={styles.directors}><p className={styles.p}>Director: Monica Nguyen</p></div>
                        <div className={styles.cinematographer}><p className={styles.p}>Cinematographer: Also Me</p></div>
                    </div>

                    <div className={styles.project__img}>
                       <img className={styles.img} src="/img/gallery/img1.webp" alt="Project Image" />
                    </div>
                </div>

                <div className={styles.gallery__wrapper}>
                    <div className={styles.gallery}></div>
                </div>
                
            </div>
        </>
    )
}