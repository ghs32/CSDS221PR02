import './App.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu'; 
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CancelIcon from '@mui/icons-material/Cancel';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

let indexVal = 0;

function App(){
  toastr.options.positionClass = 'toast-bottom-right';

  const[edit, setOpenEdit] = React.useState(false);
  const [rows, setRows] = React.useState([
    {
      locationVal: 0,
      title: "",
      description: "",
      deadline: null,
      priority: "",
      action: null,
      visible: false,
    }
  ])
  if(indexVal == 0){
    rows.splice(0);
  }


  const updateOpen = (titleVal) => {
    setTitleEditValue(titleVal);
    const currentIndex = rows.findIndex((rows) => rows.title === titleVal);
    setDateEditError(false);
    setPriorityEditError(false);
    setDescriptionEditError(false);
    setDescriptionEditValue("");
    setDateValueEdit(""); 
    setPriorityValueEdit("");
    setOpenEdit(true);
  }


  const updateClose = () => {
    if(dateValueEdit===""){
      setDateEditError(true);
      if(priorityValueEdit===""){
        setPriorityEditError(true);
      }
      if(descriptionEdit===""){
        setDescriptionEditError(true);
      }
      setOpenEdit(true);
      return;
    }
    if(descriptionEdit===""){
      setDescriptionEditError(true);
      if(dateValueEdit===""){
        setDateEditError(true);
      }
      if(priorityValueEdit===""){
        setPriorityEditError(true);
      }
      setOpenEdit(true);
      return;
    }
    if(priorityValueEdit===""){
      setPriorityEditError(true);
      if(descriptionEdit===""){
        setDescriptionEditError(true);
      }
      if(dateValueEdit===""){
        setDateEditError(true);
      }
    }
    if(descriptionEditError === true || priorityEditError === true || dateEditError === true){
      setOpenEdit(true);
      return;
    }
    setOpenEdit(false);
    toastr.success("task was updated succesfully");
    editRow();
  }

  const updateCloseCancel = () => {
    setOpenEdit(false);
  }

  const editRow = () => {
    const currentIndex = rows.findIndex((rows) => rows.title === titleEdit);
    rows[currentIndex].description = descriptionEdit;
    const DateValueFormat = new Date(dateValueEdit).toLocaleDateString('en-US',  {timeZone: 'UTC'});
    rows[currentIndex].deadline = DateValueFormat;
    rows[currentIndex].priority = priorityValueEdit;
  }

  const [open, setOpen] = React.useState(false);
  const [title, setTitleValue] = useState("");
  const [titleEdit, setTitleEditValue] = useState("");
  const [description, setDescriptionValue] = useState("");
  const [dateValue, setDateValue] = useState(new Date);
  const [priorityValue, setPriorityValue] = useState();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [descriptionEdit, setDescriptionEditValue] = useState("");
  const [dateValueEdit, setDateValueEdit] = useState(new Date);
  const [priorityValueEdit, setPriorityValueEdit] = useState();
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [priorityError, setPriorityError] = useState(false);
  const [descriptionEditError, setDescriptionEditError] = useState(false);
  const [dateEditError, setDateEditError] = useState(false);
  const [priorityEditError, setPriorityEditError] = useState(false);
  const [hide, setHide] = useState(null);

  const handleClickOpen = () => {
    setTitleError(false);
    setDescriptionError(false);
    setDateError(false);
    setTitleValue('');
    setDescriptionValue('');
    setDateValue('');
    setPriorityValue('');
    setOpen(true);
  };

    const handleCloseCancel = () => {
      setOpen(false);
    };

    const handleClose = () => {   
      if(title===""){
        setTitleError(true);
        if(description===""){
          setDescriptionError(true);
        }
        if(dateValue ===""){
          setDateError(true);
        }
        if(priorityValue===""){
          setPriorityError(true);
        }
        setOpen(true);
        return;
      }
      if(description===""){
        setDescriptionError(true);
        if(title===""){
          setTitleError(true);
        }
        if(dateValue ===""){
          setDateError(true);
        }
        if(priorityValue===""){
          setPriorityError(true);
        }
        setOpen(true);
        return;
      }
      if(dateValue ===""){
        setDateError(true);
        if(title===""){
          setTitleError(true);
        }
        if(description===""){
          setDescriptionError(true);
        }
        if(priorityValue===""){
          setPriorityError(true);
        }
        setOpen(true);
        return;
      }
      if(priorityValue===""){
        setPriorityError(true);
        if(title===""){
          setTitleError(true);
        }
        if(description===""){
          setDescriptionError(true);
        }
        if(dateValue ===""){
          setDateError(true);
        }
        setOpen(true);
        return;
      }
      if(titleError === true || descriptionError === true){
        setOpen(true);
        return;
      }
      setOpen(false);
      toastr.success("task was added succesfully");
      updateRow();
    };

    

  const updateRow = (data) => {
      const DateValueFormat = new Date(dateValue).toLocaleDateString('en-US',  {timeZone: 'UTC'});
      indexVal++;
      data = {
        locationVal: indexVal,
        title: title,
        description: description,
        deadline: DateValueFormat,
        priority: priorityValue, 
      }
      setRows([...rows, data]);
  }


  const handleTitleChange = (event) => {
    let a = event.target.value;
    let b = 0;
      for(let i = 0; i < indexVal; i++){
        if(a===rows[i].title){
          setTitleError(true);
          b = 1;
        }
      }
    if(a.trim().length === 0){
      setTitleError(true);
      b = 1;
    }
    
    if(b==0){
      setTitleError(false);
    }
    setTitleValue(event.target.value);
  }

  const handleTitleClick = (event) =>{ 
      if(event.target.value===""){
        setTitleError(true);
      }
  }

  const handleDescriptionEditClick = (event) =>{
    if(event.target.value===""){
      setDescriptionEditError(true);
    }
  }

  const handleDescriptionClick = (event) =>{
    if(event.target.value===""){
      setDescriptionError(true);
    }
  }
  const handleDateClick = (event) => {
    if(event.target.value == ""){
      setDateError(true);
    }
  }

  const handleDateEditClick = (event) => {
    if(event.target.value == ""){
      setDateEditError(true);
    }
  }

  const handleDescriptionChange = (event) => {
    let a = event.target.value;
    let b = 0;
    if(a.trim().length === 0){
      setDescriptionError(true);
      b = 1;
    }
    if(b==0){
      setDescriptionError(false);
    }
    setDescriptionValue(event.target.value);
  }

  const handleDescriptionChangeEdit = (event) => {
    let a = event.target.value;
    let b = 0;
    if(a.trim().length === 0){
      setDescriptionEditError(true);
      b = 1;
    }
    if(b==0){
      setDescriptionEditError(false);
    }
    setDescriptionEditValue(event.target.value);
  }

  const handleDateChange = (event) => {
    if(event.target.value.trim() != 0){
      setDateError(false);
    }
    setDateValue(event.target.value);
  }

  const handleDateChangeEdit = (event) => {
    if(event.target.value.trim() != 0){
      setDateEditError(false);
    }
    setDateValueEdit(event.target.value);
  }

  const priorityChange = (event) => {
    setPriorityError(false);
    setPriorityValue(event.target.value);
  }

  const priorityChangeEdit = (event) => {
    setPriorityEditError(false);
    setPriorityValueEdit(event.target.value);
  }


  return (
    
    <div className="App">


      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100}} aria-label="simple table">
        <TableHead>
          <TableRow className = "tableHeader">
              
              <TableCell align="center" colSpan={5}>
                <MenuIcon sx={{fontSize: '30px'}}color="primary"></MenuIcon>
                <span className='text'>Frameworks</span>
                <Grid container >
                  
                </Grid>
              </TableCell>
              <TableCell align="right" colSpan={0}>
                <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleClickOpen}>Add</Button>
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Deadline</TableCell>
            <TableCell align="center">Priority</TableCell>
            <TableCell align="center">Is Complete</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.deadline}</TableCell>
                <TableCell align="center">{row.priority}</TableCell>
                  <TableCell align="center"> <input type="checkbox" onClick={() => {
                    let changed = false; 
                    if(row.visible == null){
                      setHide(false); 
                      row.visible = false; 
                      changed = true; 
                      }else{
                        if(row.visible === true){
                          setHide(false); 
                          row.visible = false;}
                          else{
                            setHide(true); 
                            row.visible = true;
                          }
                      } 
                      if(changed == true){
                          setHide(true);
                          row.visible = true; 
                      }
                      setRows([...rows]);
                      }}>
                                              </input>      
                </TableCell>
                <TableCell align="center">
                  <div>
                    {row.visible == true? (<Button variant="contained" id="deleteButton" onClick={() => {indexVal--; toastr.success("task was deleted succesfully"); setRows(rows.filter((rows) => rows.title !== row.title)); ;}}><CancelIcon fontSize="small" />Delete</Button>) : (
                      <><Button variant="contained" id="deleteButton" onClick={() => {indexVal--; toastr.success("task was deleted succesfully"); setRows(rows.filter((rows) => rows.title !== row.title)); } }><CancelIcon fontSize="small" />Delete</Button>
                      <Button variant="contained" id="updateButton" onClick={() => {updateOpen(row.title)}}><EditIcon fontSize="small" /> Update </Button></>)}
                  </div>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    

    <Dialog open={edit} onClose={updateClose}>
      <DialogTitle sx={{bgcolor: 'primary.dark', color: 'white' }}> <EditIcon fontSize="small" /> Edit Task</DialogTitle>
      <DialogContent sx={{}}>
          <div>
            <TextField sx={{padding: 1, marginTop: 3}} error={descriptionEditError} value = {descriptionEdit} helperText={descriptionEditError ? "Description is blank" : ""} id="outlined-basic" label="Description" variant="outlined" onBlur = {handleDescriptionEditClick} onChange ={handleDescriptionChangeEdit}/>
          </div>
          <div>
          <TextField type="date" error={dateEditError} helperText={dateEditError ? "There is no deadline" : ""} onBlur={handleDateEditClick} value={dateValueEdit} onChange={handleDateChangeEdit} sx={{ width: '100%' }}/>
          </div>
          <div>
          <FormLabel sx={{padding: 1}} error={priorityEditError}>priority</FormLabel>  
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              
              name="radio-buttons-group"
              value = {priorityValueEdit}
              onChange={priorityChangeEdit}
            >
              <FormControlLabel value="low" control={<Radio />} label="low" />
              <FormControlLabel value="medium" control={<Radio />} label="medium" />
              <FormControlLabel value="high" control={<Radio />} label="high" />
            </RadioGroup>
            <FormHelperText id="errorText">{priorityEditError ? "^ No priority selected ^" : ""}</FormHelperText>
          </div>
        </DialogContent>
      <DialogActions>
          <Button variant='contained' sx={{ bgcolor: 'primary.dark', color: 'white'}} onClick={updateClose}>  <EditIcon fontSize="small" /> Edit</Button>
          <Button variant='contained' sx={{ bgcolor: 'red', color: 'white'}} onClick={updateCloseCancel}><DoNotDisturbAltIcon fontSize="small" />Cancel</Button>
      </DialogActions>
    </Dialog>

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{bgcolor: 'primary.dark', color: 'white' }}> <AddCircleIcon fontSize="small" />Add Task</DialogTitle>
        <DialogContent sx={{}}>
          <div>
             <TextField sx={{padding: 1, marginTop: 3}} value = {title} error ={titleError} helperText={titleError ? "Title is either blank or a duplicate" : ""} id="outlined-basic" label="Title" variant="outlined" onBlur={handleTitleClick} onChange ={handleTitleChange}/>
          </div>
          <div>
            <TextField sx={{padding: 1}} value = {description} error = {descriptionError} helperText={descriptionError ? "Description is blank" : ""} id="outlined-basic" label="Description" variant="outlined" onBlur={handleDescriptionClick} onChange ={handleDescriptionChange}/>
          </div>
          <div>
          <TextField sx={{padding: 1}} type="date" helperText={dateError ? "There is no deadline" : ""} onBlur={handleDateClick} value={dateValue} onChange={handleDateChange} error={dateError} sx={{ width: '100%' }}/>
          </div>
          <div>
          <FormLabel error = {priorityError}>priority</FormLabel>  
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="medium"
              name="radio-buttons-group"
              value = {priorityValue}
              onChange={priorityChange}
            >
              <FormControlLabel value="low" control={<Radio />} label="low" />
              <FormControlLabel value="medium" control={<Radio />} label="medium" />
              <FormControlLabel value="high" control={<Radio />} label="high" />
            </RadioGroup>
            <FormHelperText id="errorText">{priorityError ? "^ No priority selected ^" : ""}</FormHelperText>
          </div>
          
        </DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{ bgcolor: 'primary.dark', color: 'white'}} onClick={handleClose}><AddCircleIcon></AddCircleIcon>Add</Button>
          <Button variant='contained' sx={{ bgcolor: 'red', color: 'white'}} onClick={handleCloseCancel}><DoNotDisturbAltIcon fontSize="small" />Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App; 
