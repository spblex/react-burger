import {motion} from "framer-motion";
import style from "./pre-loader.module.css";
import pre_loader from "../../../images/pre_loader.png";
import {FC} from "react";

export const PreLoader: FC = () => {
    return (
        <div className={style.main}>
            <motion.img
                className={style.image}
                src={pre_loader}
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 180, 180, 0],
                    borderRadius: ["0%", "0%", "50%", "50%", "0%"]
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1
                }}
            />
            <p className={style.text}>Загрузка...</p>
        </div>
    )
}