import {  useMutation } from '@apollo/client';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import PropTypes from 'prop-types';

export default function ClientRow({ client }) {
    const [deleteClient] =useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        //optional to get ui to update after delete
        //refetchQueries: [{ query: GET_CLIENTS }]

        // preferred way to get ui to update after delete
        update(cache, { data: { deleteClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: clients.filter((client) => client.id !== deleteClient.id)
                }
            });
        }
    });

    return (
        <>
            <TableRow>
                <TableCell >{client.id}</TableCell>
                <TableCell align="right">{client.name}</TableCell>
                <TableCell align="right">{client.email}</TableCell>
                <TableCell align="right">{client.phone}</TableCell>
             
                <TableCell align="right">      <IconButton aria-label="delete" onClick={deleteClient}>
        <DeleteIcon />
      </IconButton></TableCell>
            </TableRow>
        </>
    );
}

ClientRow.propTypes = {
    client: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired
    }).isRequired
};
