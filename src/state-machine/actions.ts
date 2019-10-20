import { ADD_CONTACT } from './../queries/index';
import { useMutation } from 'react-apollo';
import { send } from 'xstate';

export const actions = {
	actions:{
		
		saveRouter:(ctx:any,e:any) => {
			ctx.router = e.router;
		},
		addContact:  (ctx:any,e:any) => {
			ctx.router.push('/contacts/add');
		},
		getSelectedId:(ctx:any,e:any) => {
			ctx.selectedId = e.id;
		},
		viewContact:  (ctx:any,e:any) => {
			ctx.router.push('/contacts/view/'+ctx.selectedContact.id);
		},
		editContact:  (ctx:any,e:any) => {
			ctx.router.push('/contacts/edit/'+ctx.selectedContact.id);
		},
		saveContactAction:  (ctx:any,e:any) => {
			ctx.newContact = e.newContact
		},
		loadContacts: (ctx:any,e:any) => {
			ctx.router.push('/');
			send('LOAD_CONTACT_LIST',ctx.router);
		},
		contactSelected: (ctx:any,e:any) =>{
			ctx.selectedContact = e.contact
		},
		updateContact: (ctx:any,e:any) =>{
			ctx.selectedContact[e.name] = e.value;
		},
	}
}