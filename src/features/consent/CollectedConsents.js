import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchConsentsAsync, selectAllConsents } from './consentsSlice';
import styles from './consent.module.scss';

export function CollectedConsents() {
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const consents = useSelector(selectAllConsents);
    const rowsPerPage = 2;

    useEffect(() => {
        dispatch(fetchConsentsAsync());
    }, [dispatch])

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    if (!consents) return null;
    return (
        <div className={styles.tableWrapper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Name
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                            Email
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="right">
                            Consents
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {consents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell style={{ width: 220 }} align="right">
                                {row.email}
                            </TableCell>
                            <TableCell style={{ width: 220 }} align="right">
                                {row.consents.join(', ')}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={consents.length}
                            rowsPerPage={2}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[]}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
