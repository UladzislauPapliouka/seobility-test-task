import React, {FC, InputHTMLAttributes} from "react";
import InputMask from 'react-input-mask';
import styles from "./maskedInputStyle.module.scss"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    mask: string | Array<(string | RegExp)>;
}

export const MaskedInput: FC<Props> = ({mask, ...props}) => <InputMask mask={mask} alwaysShowMask
                                                                       className={styles.input}/>
