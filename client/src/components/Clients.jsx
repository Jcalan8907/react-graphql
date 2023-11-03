import { useQuery } from '@apollo/client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Spinner from './Spinner';
import ClientRow from './ClientRow';
  import AddClientModal from "./AddClientModal";
import { GET_CLIENTS } from '../queries/clientQueries';


export default function Clients() {

  const { loading, error, data } = useQuery(GET_CLIENTS);


  if (loading) return <Spinner/>;
  if(error) return <p>Something Went Wrong</p>
  return (
    <>
      {!loading && !error && (
        <div>
          <AddClientModal />
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">NAME</TableCell>
            <TableCell align="right">EMAIL</TableCell>
            <TableCell align="right">PHONE</TableCell>
 
          </TableRow>
        </TableHead>
        <TableBody>
          {data.clients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
        </div>
      )}
    </>
  )
}