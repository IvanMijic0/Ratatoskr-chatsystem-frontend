export const usernameValidation = ( value: any ) => value.match(/^[A-Za-z0-9]{3,20}$/);
export const emailValidation = ( value: any ) => value.match(
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
export const passwordValidation = ( value: any ) => value.match(
	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
);