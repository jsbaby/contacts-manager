import React from "react";
import { useParams } from "react-router";
import { Button, TextField } from "@material-ui/core";
import './contact-details.component.css';
import { Contact } from "../../models/contact";
import { machine } from "../../state-machine/fsm";
import { useMachine } from "@xstate/react";
export const ContactDetails = (props:any) =>{
    const {id} = useParams();
    const { match, location, history } = props;
    const isAdd = location.pathname.startsWith('/contacts/add');
    const isEdit = location.pathname.startsWith('/contacts/edit');
    const isView = location.pathname.startsWith('/contacts/view');
    
    const [state,send,service] = useMachine(machine); 
    service.start();
    send('ADD_CONTACT',{router:props.history});

    const [contact, setValues] = React.useState<Contact>(new Contact());
    const handleChange = (name: string ) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...contact, [name]: event.target.value });
    };
    send('addContact');
    console.log(state)
    let save;
    if(isAdd){
        save = <div><Button onClick={()=> send('SAVE_NEW_BUTTON',{newContact:contact})}>Save</Button></div>       
    }
    
    return(
       <div className="contact-details">
        <form>
            <TextField
                    id="name"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange('name')}
                />
           <TextField
                    id="email"
                    type="email"
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange('email')}
                />
           
           <div className="contact-btn-panel">
                { 
                  save
                }
                  <div>
                      <Button variant="contained" component="span" onClick={()=> send('BACK_BUTTON')}>
                        Back to Contact list
                      </Button>
                  </div>
              </div>
        </form>
       </div>
    )
}