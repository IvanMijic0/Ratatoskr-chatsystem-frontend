const extractPayloadFromToken = ( token: string | null ): any | null => {
	if ( token ) {
		const tokenParts = token.split('.');
		if ( tokenParts.length === 3 ) {
			const payloadBase64 = tokenParts[1];
			try {
				const payloadJson = atob(payloadBase64);
				return JSON.parse(payloadJson);
			} catch (error) {
				console.error('Error decoding token payload:', error);
			}
		}
	}

	return null;
};

export default extractPayloadFromToken;