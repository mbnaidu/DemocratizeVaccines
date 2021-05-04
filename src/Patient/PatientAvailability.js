import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Accordion, AccordionDetails, AccordionSummary, Button, Icon, Input, Slide, Snackbar } from '@material-ui/core'

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalTaxiSharpIcon from '@material-ui/icons/LocalTaxiSharp';
import BatteryStdSharpIcon from '@material-ui/icons/BatteryStdSharp';
import HotelSharpIcon from '@material-ui/icons/HotelSharp';
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp';
import InvertColorsSharpIcon from '@material-ui/icons/InvertColorsSharp';
import { NavLink } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

function descendingComparator(a, b, orderBy){
	if (b[orderBy] < a[orderBy]){
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) return order;
				return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

const rows = [
	createData('Madhu1213', 1,42 , 6700, 'Ravuri vari Street,Gunipudi'),
	createData('Satish1214', 10,113 , 5100, 'Ravuri vari Street,Gunipudi'),
	createData('Gopi1215', 11,165 , 2400, 'Ravuri vari Street,Gunipudi'),
	createData('Sasi1244', 12,164, 2400, 'Ravuri vari Street,Gunipudi'),
	createData('Kiran1240', 13, 190, 4900, 'Ravuri vari Street,Gunipudi'),
	createData('Sai1233', 14,255 , 8700, 'Ravuri vari Street,Gunipudi'),
	createData('Vinay1266', 15,425, 3700, 'Ravuri vari Street,Gunipudi'),
	createData('Manoj1211', 16,640, 9400, 'Ravuri vari Street,Gunipudi'),
	createData('Srinu1216', 17,1738, 6500, 'Ravuri vari Street,Gunipudi'),
	createData('Srinivas1217', 18,3465, 9800, 'Ravuri vari Street,Gunipudi'),
	createData('Vbk1218', 19, 7080, 8100, 'Ravuri vari Street,Gunipudi'),
	createData('Sunil1219', 20,10, 900, 'Ravuri vari Street,Gunipudi'),
	createData('Vamsi1210', 21, 30, 6300, 'Ravuri vari Street,Gunipudi'),
];

const headCells = [
	{ id: 'userId', numeric: false, disablePadding: true, label: 'UserID' },
	{ id: 'quantity', numeric: true, disablePadding: true, label: 'Quantity' },
	{ id: 'liters', numeric: true, disablePadding: true, label: 'Liters' },
	{ id: 'price', numeric: true, disablePadding: false, label: 'Price' },
	{ id: 'address', numeric: false, disablePadding: false, label: 'Address' },
];

function EnhancedTableHead(props) {
	const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
};
return (
    <TableHead>
    <TableRow>
        <TableCell padding="checkbox">
			<Checkbox
				indeterminate={numSelected > 0 && numSelected < rowCount}
				checked={rowCount > 0 && numSelected === rowCount}
				onChange={onSelectAllClick}
				inputProps={{ 'aria-label': 'select all desserts' }}
			/>
        </TableCell>
        {headCells.map((headCell) => (
			<TableCell
				key={headCell.id}
				align={headCell.numeric ? 'right' : 'left'}
				padding={headCell.disablePadding ? 'none' : 'default'}
				sortDirection={orderBy === headCell.id ? order : false}
			>
				<TableSortLabel
				active={orderBy === headCell.id}
				direction={orderBy === headCell.id ? order : 'asc'}
				onClick={createSortHandler(headCell.id)}
				>
				{headCell.label}
				{orderBy === headCell.id ? (
					<span className={classes.visuallyHidden}>
					{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
					</span>
				) : null}
				</TableSortLabel>
			</TableCell>
        ))}
    </TableRow>
    </TableHead>
);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
	root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
},
	highlight:
    theme.palette.type === 'light'
	? {
	color: theme.palette.secondary.main,
	backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
	: {
	color: theme.palette.text.primary,
	backgroundColor: theme.palette.secondary.dark,
        },
	title: {
    flex: '1 1 100%',
	},
}));

const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { numSelected } = props;
		return (
			<Toolbar className={clsx(classes.root, {[classes.highlight]: numSelected > 0,})}>
				{numSelected > 0 ? (
					<Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
						{numSelected} selected
					</Typography>
				) : (
					<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
						Available
					</Typography>
				)}
				{numSelected > 0 ? (
					<Tooltip title="Delete">
						<IconButton aria-label="delete">
								<Button color="primary" data-toggle="modal" data-target="#checkpatient">Send Request</Button>
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Filter list">
						<IconButton aria-label="filter list">
								<FilterListIcon />
						</IconButton>
					</Tooltip>
				)}
			</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
    width: '100%',
	},
	paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
	},
	table: {
    minWidth: 750,
	},
	visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
	},
}));

const ueStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(23),
        flexBasis: '73%',
        flexShrink: 0,
        color: theme.palette.text.primary    ,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        color: theme.palette.text.disabled,
    },
    secondaryHeading1: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        color: theme.palette.text.primary,
    },
}));

export default function PatientAvailability() {
	const classes = useStyles();
	const classe = ueStyles();
	const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    // SEND REQUEST
        function TransitionDown(props) {
            return <Slide {...props} direction="down" />;
            }
        const [open, setOpen] = React.useState(false);
        const [transition, setTransition] = React.useState(undefined);
        const handleClic = (Transition) => () => {
            setTransition(() => Transition);
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
	const [generate,setGenerate] = React.useState('Generate')
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);		
	const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
		};

		const handleSelectAllClick = (event) => {
    if (event.target.checked) {
		const newSelecteds = rows.map((n) => n.name);
	setSelected(newSelecteds);
	return;
    }
    setSelected([]);
	};

	const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
	newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
	newSelected = newSelected.concat(selected.slice(1));
	} else if (selectedIndex === selected.length - 1) {
	newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
	newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
	);
    }
    setSelected(newSelected);
	};
	const handleChangePage = (event, newPage) => {
    setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
	};
	const handleChangeDense = (event) => {
    setDense(event.target.checked);
	};
	const isSelected = (name) => selected.indexOf(name) !== -1;
	const oxygen = () =>{
    return(
        <div>
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<EnhancedTableToolbar numSelected={selected.length} />
					<TableContainer>
						<Table className={classes.table} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} aria-label="enhanced table">
							<EnhancedTableHead classes={classes} numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={rows.length}/>
							<TableBody>
								{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.name);
									const labelId = `enhanced-table-checkbox-${index}`;
										return (
											<TableRow hover onClick={(event) => handleClick(event, row.name)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.name} selected={isItemSelected} >
											<TableCell padding="checkbox">
												<Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
											</TableCell>
											<TableCell component="th" id={labelId} scope="row" padding="none">
												{row.name}
											</TableCell>
											<TableCell align="right">{row.calories}</TableCell>
											<TableCell align="right">{row.fat}</TableCell>
											<TableCell align="right">{row.carbs}</TableCell>
											<TableCell align="right">{row.protein}</TableCell>
											</TableRow>
										);
								})}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination rowsPerPageOptions={[1, 10, 25]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
				</Paper>
			</div>
        </div>
    )
	}
return (
    <div>
		<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">Oxygen Cylinders</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					</div>
					<div class="modal-body">
						{oxygen()}
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="checkpatient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">Checking User...</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					</div>
					<div class="modal-body">
						{generate === "Generate" ? (
							<div>
								<Input placeholder="10-digit-phone-number" type="number" id="phonenumber"/>{' '}
								<Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={()=>{setGenerate('Submit');}}>
									{generate}
								</Button>
							</div>
						) : (
							<div>
								<Input placeholder="6-digit-code" id="6digitcode"/>{' '}<Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={()=>{setGenerate('Submit');}}>
									{generate}
								</Button>
							</div>
						)}						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<nav className="glass">
			<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
			<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="accordian" data-toggle="modal" data-target="#exampleModalCenter">
				<AccordionSummary expandIcon={<BatteryStdSharpIcon style={{ color: "blue" ,fontSize: 30 }} />} aria-controls="panel1bh-content"id="panel1bh-header">
					<Typography className={classe.heading}>Oxygen Cylinders</Typography>
					<Typography className={classe.heading1}>Available </Typography>
				</AccordionSummary>
			</Accordion>
			<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="accordian">
                    <AccordionSummary expandIcon={<HotelSharpIcon style={{ color: "brown" ,fontSize: 30 }} />} aria-controls="panel2bh-content"id="panel2bh-header" >
                        <Typography className={classe.heading}>ICU Beds</Typography>
                        <Typography className={classe.heading1}>Not Available</Typography>
                    </AccordionSummary>
                </Accordion>
				<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="accordian">
                    <AccordionSummary expandIcon={<LocalHospitalIcon style={{ color: "green" ,fontSize: 30 }} />} aria-controls="panel3bh-content" id="panel3bh-header" >
                        <Typography className={classe.heading}>Ambulance</Typography>
                        <Typography className={classe.heading1}>Available</Typography>
                    </AccordionSummary>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="accordian">
                    <AccordionSummary expandIcon={<LocalTaxiSharpIcon style={{ color: "gold" ,fontSize: 30}} />} aria-controls="panel4bh-content" id="panel4bh-header" >
                        <Typography className={classe.heading}>Private Transport</Typography>
                        <Typography className={classe.heading1}>Not Available</Typography>
                    </AccordionSummary>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className="accordian">
                    <AccordionSummary expandIcon={<VerifiedUserSharpIcon   style={{ color: "green" ,fontSize: 30}} />} aria-controls="panel5bh-content" id="panel5bh-header" >
                        <Typography className={classe.heading}>Vaccine</Typography>
                        <Typography className={classe.heading1}>Available</Typography>
                    </AccordionSummary>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} className="accordian">
                    <AccordionSummary expandIcon={<InvertColorsSharpIcon  style={{ color: "red" ,fontSize: 30}} />} aria-controls="panel4bh-content" id="panel4bh-header" >
                        <Typography className={classe.heading}>Plasma</Typography>
                        <Typography className={classe.heading1}>Not Available</Typography>
                    </AccordionSummary>
                </Accordion>
				<NavLink to="/"><Button variant="contained" color="primary">HOME</Button></NavLink>{" "}
		</nav>
    </div>
	);
}
