import { ADD_CONTACT } from './../queries/index';
import {apolloClient} from '../utils/dbclient';
import { GET_CONTACTS } from '../queries';

export const getContacts=  (ctx:any,e:any) => {
	return apolloClient.query({query: GET_CONTACTS})	
}

export const saveContact=  (ctx:any,e:any) => {
    return apolloClient.mutate({mutation: ADD_CONTACT, variables:{contact: ctx.newContact}});	
}