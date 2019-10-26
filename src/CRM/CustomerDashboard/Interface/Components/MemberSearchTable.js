import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import Button from '@material-ui/core/Button';

import TextField from '../../../Common/Components/TextField';

const axios = require('axios');

const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
    },
}));




function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;



    function handleFirstPageButtonClick(event) {
        onChangePage(event, 0);
    }

    function handleBackButtonClick(event) {
        onChangePage(event, page - 1);

    }

    function handleNextButtonClick(event) {
        onChangePage(event, page + 1, function(event) {
            setStart(page);

        });

    }

    function handleLastPageButtonClick(event) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(RoleID, GivenName, Surname) {
    return { RoleID, GivenName, Surname };
}


var rows = [
    createData('Cupcake', 305, 3.7)
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
}));


var start = 0;

function setStart(page) {
    start = page * 5;
}


export default function MemberSearchTable(props) {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [rows, setRows] = React.useState({
        "totalCount": 0,
        "data": null
    });

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    var datasubset = {
        "totalCount": 0,
        "data": []
    };
    var tableData = datasubset.data;

    var test = {
        "totalCount": 0,
        "data": null
    };



    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);

    }

    function findMembers() {
        getMembers();
    }

    function getMembers() {

        axios.get('http://localhost:3001/v1/customer/', {
            params: {
                start: start,
                limit: 5
            }
        })
            .then(function (response) {
                console.log("Triggered");
                // console.log(response.data.data)
                // isLoaded = true;
                setIsLoaded(true);
                setRows(response.data);
                return null;
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function (response) {
                // always executed
            });
    }


    function getTable(rows) {

        if (rows.totalCount == 0) {
            console.log('nothing here');
            return null;
        } else {
            return <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>RoleID</TableCell>
                        <TableCell align="right">Given name</TableCell>
                        <TableCell align="right">Surname</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                        <TableRow key={row.RoleID}>
                            <TableCell component="th" scope="row">
                                {row.RoleID}
                            </TableCell>
                            <TableCell align="right">{row.GivenName}</TableCell>
                            <TableCell align="right">{row.Surname}</TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 48 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination

                            rowsPerPageOptions={[5, 10]}
                            colSpan={3}
                            count={rows.totalCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>

        }
    }

    var table = getTable(rows);


    return (
        <Paper className={classes.root}>

            Start: {start}
            <hr />
            Page: {page}

            <hr />
            Rows: {JSON.stringify(rows)}
            <hr />
            {JSON.stringify(isLoaded)}
            <hr />

            <Button
                onClick={findMembers}
                variant="contained" color="primary">
                Search
            </Button>

            <div className={classes.tableWrapper}>
                {table}
            </div>


        </Paper>
    );
}