import { Autocomplete, Paper, TextField, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FC } from "react";
import ICustomAutoCompleteProps from "./ICustomAutoCompleteProps.ts";

const CustomAutoComplete: FC<ICustomAutoCompleteProps>
	= ( {
			onInputChange,
			value,
			placeHolder,
			options,
			label,
			...props
		} ) => {
	return (
		<Autocomplete
			className={ props.className }
			disablePortal={ props.disablePortal }
			id={ props.id }
			options={ options }
			getOptionLabel={ ( option ) => ( typeof option === 'object' ? option.username : option ) }
			popupIcon={ <ArrowDropDownIcon sx={ { color: 'whitesmoke' } }/> }
			clearIcon={ <ClearIcon sx={ { color: 'whitesmoke', fontSize: '1.2rem' } }/> }
			noOptionsText={ <Typography>No options</Typography> }
			placeholder={ placeHolder }
			renderInput={ ( params ) => (
				<TextField
					{ ...params }
					value={ value }
					label={ label }
					onChange={ onInputChange }
					size="small"
					variant="standard"
					color="secondary"
					InputLabelProps={ {
						sx: {
							color: 'whitesmoke',
							'& label.Mui-focused': {
								color: 'whitesmoke',
							},
						},
					} }
					inputProps={ {
						sx: {
							color: 'whitesmoke',
							fontSize: '1rem',
						},
						...params.inputProps,
					} }
					sx={ {
						'& fieldset': {
							borderColor: 'whitesmoke',
						},
					} }
				/>
			) }
			PaperComponent={ ( props ) => (
				<Paper
					sx={ {
						background: '#181b1e',
						color: 'whitesmoke',
						fontSize: '25px',
					} }
					{ ...props }
				/>
			) }
			{ ...props }
		/>
	);
};

export default CustomAutoComplete;
