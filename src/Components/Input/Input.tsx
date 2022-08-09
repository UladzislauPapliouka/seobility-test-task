import React, {FC, InputHTMLAttributes} from "react";
import styles from "./inputStyle.module.scss"

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}
export const Input: FC<Props> = ({
   ...props
}) => <input {...props} className={styles.input}/>
