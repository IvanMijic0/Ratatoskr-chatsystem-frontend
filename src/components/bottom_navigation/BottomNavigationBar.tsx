import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import classes from './BottomNavigationBar.module.css';

const BottomNavigationBar = () => {
	return <BottomNavigation className={ classes.bottomNavBar }>
		<BottomNavigationAction
			className={ classes.action }
			label="Recents"
			icon={ <RestoreIcon className={ classes.icon }/> }
		/>
		<BottomNavigationAction
			className={ classes.action }
			label="Favorites"
			icon={ <FavoriteIcon className={ classes.icon }/> }
		/>

		<BottomNavigationAction
			className={ classes.action }
			label="Folder"
			icon={ <FolderIcon className={ classes.icon }/> }/>
	</BottomNavigation>;
};

export default BottomNavigationBar;
