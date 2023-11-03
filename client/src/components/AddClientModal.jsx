import {useState} from 'react'
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function AddClientModal() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

 const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

    
      const handleClickOpen = () => {
    setOpen(true);
  };

    const handleClose = () => {
   
        setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }

    addClient(name, email, phone);

    setName('');
    setEmail('');
      setPhone('');
    handleClose();
  };

  return (
    <> <Button variant="outlined" onClick={handleClickOpen}>
        Add Client
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD CLIENT</DialogTitle>
        <DialogContent>
       
       
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
                      variant="standard"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
                      variant="standard"
                             value={email}
                      onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
                      variant="standard"
                             value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                          />
                          
                 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'  onClick={onSubmit}>Add</Button>
        </DialogActions>
      </Dialog></>
  )
}
