import React, {FC} from "react";
import styles from "./Form.module.scss"
import {Input} from "../Input/Input";
import logo from '../../assets/logo.svg'
import {MaskedInput} from "../MaskedInput/MaskedInput";
import {TextFiled} from "./TextField/TextFiled";
export const Form: FC = () => {
    return (
        <div className={styles.container}>
            <img src={logo} alt="logo"/>
            <form className={styles.formBox}>
                <Input placeholder={"Ваше имя"}/>
                <Input placeholder={"E-mail"}/>
                <MaskedInput  mask="+7 (999) 999-99-99"/>
                <Input type={"date"}/>
                <TextFiled maxLength={300} minLength={10} />
                <button>SEND</button>
            </form>
        </div>
    )
}