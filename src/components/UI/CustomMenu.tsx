import { FC } from "react";
import Menu from '@mui/material/Menu';

import { CustomMenuProps } from "../../types";

const CustomMenu: FC<CustomMenuProps> = ({ children, anchorEl, open, onClose, ...menuProps }) => {
	return <Menu
		{...menuProps}
		anchorEl={anchorEl}
		open={open}
		onClose={onClose}
		sx={{
			mt: "1px",
			"& .MuiMenu-paper": { backgroundColor: "#181b1e", width: "8.2vw" },
		}}
	>
		{children}
	</Menu>;
};

export default CustomMenu;
