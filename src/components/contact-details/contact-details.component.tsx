import React from "react";
import { useParams } from "react-router";
import { Button, TextField, Snackbar } from "@material-ui/core";
import './contact-details.component.css';
import { Contact } from "../../models/contact";
import { machine } from "../../state-machine/fsm";
import { useMachine } from "@xstate/react";
import Save from '@material-ui/icons/Save';
import Left from '@material-ui/icons/ArrowLeft';
export const ContactDetails = (props:any) =>{
    const {id} = useParams();
    const { match, location, history } = props;
    const isAdd = location.pathname.startsWith('/contacts/add');
    const isEdit = location.pathname.startsWith('/contacts/edit');
    const isView = location.pathname.startsWith('/contacts/view');
    
    const [state,send,service] = useMachine(machine); 
    service.start();
    const isReadOnly=false;
    let inputs;
    let save;
    if(isAdd){
        const [contact, setValues] = React.useState<Contact>(new Contact());
        const handleChange = (name: string ) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...contact, [name]: event.target.value });
        };
        const addName = <TextField key="name"
                    id="name"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        readOnly: false,
                    }}
                    onChange={handleChange('name')}
                />
        const addEmail =  <TextField key="email"
                    id="email"
                    type="email"
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        readOnly: false,
                    }}
                    onChange={handleChange('email')}
                />
        const errsb = <Snackbar key="sb" className="snackar-error"
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    open ={state.context.errorMessage.length>0}
                    autoHideDuration={2000}
                    message={<span >{state.context.errorMessage}</span>}

                />
         const sccsb = <Snackbar key="sccsb" className="snackar-success"
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    open ={state.context.successMessage.length>0}
                    autoHideDuration={2000}
                    message={<span >{state.context.successMessage}</span>}

                />
        send('ADD_CONTACT',{router:props.history});
        send('addContact');
        inputs = [addName,  addEmail, errsb, sccsb]
        save = <div><Button onClick={()=> send('SAVE_NEW_BUTTON',{newContact:contact,message: 'Successfully created the contact.'})}><Save></Save>&nbsp;Save</Button></div>       
    } else if(isEdit){
        const handleeditChange = (name: string ) => (event: React.ChangeEvent<HTMLInputElement>) => {
            send('UPDATE_CONTACT',{name:name,value:event.target.value});
        };
        const editName = <TextField key="name"
                    id="name"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        readOnly: false,
                    }}
                    onChange={handleeditChange('name')}
                    value={state.context.selectedContact.name}
                />
        const editEmail =  <TextField key="email"
                    id="email"
                    type="email"
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        readOnly: false,
                    }}
                    onChange={handleeditChange('email')}
                    value={state.context.selectedContact.email}
                />
        const errsb = <Snackbar key="sb"
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open ={state.context.errorMessage.length>0}
                    autoHideDuration={2000}
                    message={<span>{state.context.errorMessage}</span>}

                />
        const sccsb = <Snackbar key="sccsb" className="snackar-success"
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    open ={state.context.successMessage.length>0}
                    autoHideDuration={2000}
                    message={<span >{state.context.successMessage}</span>}

                />
        inputs = [editName,  editEmail, errsb, sccsb]
        send('EDIT_CONTACT',{router:props.history, id:id});
        save = <div><Button onClick={()=> send('SAVE_EDIT_BUTTON',{message: 'Successfully updated the contact.'})}><Save></Save>&nbsp;Save</Button></div>       
    } else if( isView){
        const readName = <TextField key="name"
                    id="name"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        readOnly: true,
                    }}
                    value= {state.context.selectedContact.name}
                />
        const readEmail = <TextField key="email"    
                    id="email"
                    type="email"
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        readOnly: true,
                    }}
                    value= {state.context.selectedContact.email}
                />
        inputs = [readName,  readEmail]
        send('VIEW_CONTACT',{router:props.history, id:id});
    }
  
    
    return(
       <div className="contact-details">
           
        <form>
            {
                inputs
            }
           
           <div className="contact-btn-panel">
               <div>
                      <Button variant="contained" component="span" onClick={()=> send('BACK_BUTTON')}>
                        <Left></Left>&nbsp;Back to Contact list
                      </Button>
                </div>

                <div>
                    { 
                        save
                    }
                </div>
                
                  
              </div>
        </form>
       </div>
    )
}