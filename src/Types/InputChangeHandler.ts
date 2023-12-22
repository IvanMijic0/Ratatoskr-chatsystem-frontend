import { ChangeEvent } from "react";

type InputChangeHandler = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void;

export default InputChangeHandler;