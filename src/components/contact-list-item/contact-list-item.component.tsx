import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import '../../App.css';
import './contact-list-item.component.css';
export const ContactListItem = (contact:any,send:any) => {
    const url = "contacts/"+contact.id;
    return (
        <ListItem key={contact.id} button onClick={()=>send('SELECT_CONTACT',{contact})}>
            <ListItemText ><li className="list-item">{contact.name}</li></ListItemText>
        </ListItem>
    );
};