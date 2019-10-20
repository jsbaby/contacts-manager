import React from "react";
import { GET_CONTACTS } from "../../queries";
import { Query } from 'react-apollo';
import { ContactListItem } from "../contact-list-item/contact-list-item.component";
import { Link } from "react-router-dom";
import { useMachine } from "@xstate/react";
import { machine } from "../../state-machine/fsm";
import { List, Button } from "@material-ui/core";
import './contact-list.component.css';
import { Contact } from "../../models/contact";

export const ContactList=(props:any,ctx:any)=>{
    const [state,send,service] = useMachine(machine); 
    service.start();
    send('LOAD_CONTACT_LIST',{router:props.history});
    console.log(state.context)
    return (
            <div>
              <List className="contact-list">
                <ol>
                {
                  state.context.contacts.map((conatct:Contact) => ContactListItem(conatct,send))
                }
                </ol>
              </List>
              <div className="contact-button-panel">
                  <div>
                      <Button variant="contained" component="span" onClick={()=> send('ADD_CONTACT')}>
                        Add
                      </Button>
                  </div>
                  <div>
                    <Button disabled={!state.context.selectedContact} variant="contained" component="span" >
                      View
                    </Button>
                  </div>
                  
                  <div>
                    <Button disabled={!state.context.selectedContact} variant="contained" component="span" >
                      Edit
                    </Button>
                  </div>
                  <div>
                    <Button disabled={!state.context.selectedContact} variant="contained" component="span" >
                      Delete
                    </Button>
                  </div>
              </div>
            </div>
          )
        }
