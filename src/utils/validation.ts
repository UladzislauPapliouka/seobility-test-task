import {ChangeEvent} from "react";

export const stringValidation = (e:ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLTextAreaElement>, pattern:RegExp):boolean => {
    const string = e.currentTarget.value
    if (string.trim() === "") return true
    return pattern.test(string)
}