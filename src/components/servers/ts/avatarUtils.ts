export const stringToColor = ( string: string ): { bgColor: string; textColor: string } => {
	let hash = 0;
	let i;
	for ( i = 0; i < string.length; i += 1 ) {
		hash = string.charCodeAt(i) + ( ( hash << 5 ) - hash );
	}

	let bgColor = '#';

	for ( i = 0; i < 3; i += 1 ) {
		const value = ( hash >> ( i * 8 ) ) & 0xff;
		bgColor += `00${ value.toString(16) }`.slice(-2);
	}

	// Calculating perceived brightness (Luma)
	const r = parseInt(bgColor.slice(1, 3), 16);
	const g = parseInt(bgColor.slice(3, 5), 16);
	const b = parseInt(bgColor.slice(5, 7), 16);
	const luma = 0.299 * r + 0.587 * g + 0.114 * b;

	// Choosing text color based on perceived brightness
	const textColor = luma > 128 ? '#000000' : '#ffffff';

	return { bgColor, textColor };
};


export const stringAvatar = ( name: string ): {
	sx: { backgroundColor: string; color: string; fontSize: string };
	children: string
} => {
	const words = name.split(' ');

	const { bgColor, textColor } = stringToColor(name);

	return {
		sx: {
			backgroundColor: bgColor,
			color: textColor,
			fontSize: "1.5rem"
		},
		children: words.length > 1 ? `${ words[0][0] }${ words[1][0] }` : name.slice(0, 2),
	};
};
