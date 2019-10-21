import React from "react";
import { ContactListItem } from "../contact-list-item/contact-list-item.component";
import { useMachine } from "@xstate/react";
import { machine } from "../../state-machine/fsm";
import { Button, Icon } from "@material-ui/core";
import './contact-list.component.css';
import { Contact } from "../../models/contact";
import AddIcon from '@material-ui/icons/Add';
import PanoramaFishEye from '@material-ui/icons/PanoramaFishEye';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
export const ContactList=(props:any,ctx:any)=>{
    const [state,send,service] = useMachine(machine); 
    service.start();
    send('LOAD_CONTACT_LIST',{router:props.history});
    return (
            <div className="contact-block">
                <ol className="contact-list" >
                {
                  state.context.contacts.map((contact:Contact) => ContactListItem(contact,send))
                }
                </ol>
              <div className="contact-button-panel">
                  <div>
                      <Button variant="contained" component="span" onClick={()=> send('ADD_CONTACT')}>
                        <AddIcon></AddIcon>&nbsp;Add
                      </Button>
                  </div>
                  <div>
                    <Button disabled={state.context.selectedContact.id===""} onClick={()=> send('VIEW_CONTACT')}variant="contained" component="span" >
                      <PanoramaFishEye></PanoramaFishEye>&nbsp;View
                    </Button>
                  </div>
                  
                  <div>
                    <Button disabled={state.context.selectedContact.id===""} onClick={()=> send('EDIT_CONTACT')} variant="contained" component="span" >
                      <Create></Create>&nbsp;Edit
                    </Button>
                  </div>
                  <div>
                    <Button disabled={state.context.selectedContact.id===""} onClick={()=> send('DELETE_CONTACT')} variant="contained" component="span" >
                      <Delete></Delete>&nbsp;Delete
                    </Button>
                  </div>
              </div>
            </div>
          )
        }
