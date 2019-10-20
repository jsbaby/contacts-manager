import { ADD_CONTACT, VIEW_CONTACT, UPDATE_CONTACT } from './../queries/index';
import {apolloClient} from '../utils/dbclient';
import { GET_CONTACTS } from '../queries';
import { Contact } from '../models/contact';

export const getContacts=  (ctx:any,e:any) => {
	return apolloClient.query({query: GET_CONTACTS})	
}

export const viewContact=  (id:any) => {
	return apolloClient.query({query: VIEW_CONTACT,variables:{id:id}})	
}

export const saveContact=  (ctx:any,e:any) => {
    return apolloClient.mutate({mutation: ADD_CONTACT, variables:{contact: ctx.newContact}});	
}

export const updateContact=  (contact:Contact) => {
	console.log(contact)
    return apolloClient.mutate({mutation: UPDATE_CONTACT , variables:{contact: {id:contact.id, name:contact.name, email:contact.email}}});	
}