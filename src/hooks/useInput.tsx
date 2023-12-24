import React, { useState } from "react";

type InputChangeHandler = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void;

const useInput = ( validateValue: ( value: any ) => RegExpMatchArray ) => {
	const [enteredValue, setEnteredValue] = useState<string>('');
	const [isTouched, setIsTouched] = useState<boolean>(false);

	const valueIsValid: RegExpMatchArray = validateValue(enteredValue);
	const hasError: boolean = !valueIsValid && isTouched;

	const valueChangeHandler: InputChangeHandler = e => {
		setEnteredValue(e.target.value);
	};

	const inputBlurHandler = () => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;
