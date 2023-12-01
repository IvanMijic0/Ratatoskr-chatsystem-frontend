export const usernameRegex = ( value: any ) => value.match(/^[A-Za-z0-9]{3,20}$/);

export const emailRegex = ( value: any ) => value.match(
	/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
);

export const usernameOrEmailRegex = ( value: any ) => value.match(
	/^[a-zA-Z0-9_.]{1,30}$|^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
export const passwordRegex = ( value: any ) => value.match(
	/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
);

export const serverNameRegex = ( value: any ) => value.match(
	/^(?:[^@:/\s]+\s*){1,50}$/
);