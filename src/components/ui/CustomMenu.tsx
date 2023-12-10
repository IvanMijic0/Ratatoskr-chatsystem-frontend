import React, { ReactNode } from 'react';
import Menu, { MenuProps } from '@mui/material/Menu';

interface CustomMenuProps extends MenuProps {
	children: ReactNode;
	anchorEl: HTMLElement | null;
	open: boolean;
	onClose: () => void;
}

const CustomMenu: React.FC<CustomMenuProps> = ( { children, anchorEl, open, onClose, ...menuProps } ) => {
	return (
		<Menu
			{ ...menuProps }
			anchorEl={ anchorEl }
			open={ open }
			onClose={ onClose }
			sx={ {
				mt: "1px",
				"& .MuiMenu-paper": { backgroundColor: "#181b1e", width: "10vw" },
			} }
		>
			{ children }
		</Menu>
	);
};

export default CustomMenu;
