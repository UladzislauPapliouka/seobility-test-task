import React, {FC, TextareaHTMLAttributes} from "react";
import styles from "./TextFieldStyle.module.scss"

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {

}

export const TextFiled: FC<Props> = ({...props}) => <textarea {...props} className={styles.input}/>
