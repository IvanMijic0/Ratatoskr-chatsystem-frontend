import { MenuProps } from "@mui/material/Menu";
import { ReactNode } from "react";

type CustomMenuProps = MenuProps & {
	children: ReactNode;
	anchorEl: HTMLElement | null;
	open: boolean;
	onClose: () => void;
}

export default CustomMenuProps;