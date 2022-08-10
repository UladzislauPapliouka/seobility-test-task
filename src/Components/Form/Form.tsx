import React, {ChangeEvent, FC, FormEvent, useState} from "react";
import styles from "./Form.module.scss"
import {Input} from "../Input/Input";
import logo from '../../assets/logo.svg'
import {MaskedInput} from "../MaskedInput/MaskedInput";
import {TextFiled} from "../TextField/TextFiled";
import {stringValidation} from "../../utils/validation";
import axios from "axios";

interface State {
    nameValid: boolean,
    emailValid: boolean,
    messageValid: boolean
}

export const Form: FC = () => {
    const [state, setState] = useState<State>({
        nameValid: true,
        emailValid: true,
        messageValid: true,
    })
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const onNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.toUpperCase()
        setState({...state, nameValid: stringValidation(e, /^([A-Z]{3,30}\s[A-Z]{3,30})$/)})
    }
    const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setState({...state, emailValid: stringValidation(e, /.+@.+\..+/i)})
    }
    const onMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setState({...state, messageValid: stringValidation(e, /^.{10,300}$/)})
    }

    const sendValidation = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!state.messageValid || !state.nameValid || !state.emailValid) {
            alert("something wrong!")
            return
        }
        const formData = new FormData(e.currentTarget)
        setIsFetching(true)

        axios.post(`https://wil-express-server.herokuapp.com/seobility`, {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get('phone'),
            date: formData.get("date"),
            massage: formData.get("message")
        }).then(
            (res) => {
                if(res.status === 200){
                    form.reset()
                }
                console.log(res.data)
                setIsFetching(false)
            }
        ).catch(reason => {
            console.error(reason.response.data)
            setIsFetching(false)
        })
    }
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="logo"/>
            <form name={"formSeo"} className={styles.formBox} onSubmit={sendValidation}>
                <Input required placeholder={"Имя фамилия"} name={"name"} onChange={(e) => onNameChangeHandler(e)}/>
                {!state.nameValid && <span style={{color: "red"}}>invalid value</span>}
                <Input required formNoValidate placeholder={"E-mail"} name={"email"}
                       onChange={(e) => onEmailChangeHandler(e)}/>
                {!state.emailValid && <span style={{color: "red"}}>invalid value</span>}
                <MaskedInput name={"phone"} mask="+7 (999) 999-99-99"/>
                <Input required name={"date"} type={"date"}/>
                <TextFiled name={"message"} required onChange={(e) => onMessageChangeHandler(e)} maxLength={300}/>
                {!state.messageValid && <span style={{color: "red"}}>invalid value</span>}
                <button disabled={isFetching}>SEND</button>
            </form>
        </div>
    )
}