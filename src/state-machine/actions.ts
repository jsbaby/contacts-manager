import { ADD_CONTACT } from './../queries/index';
import { useMutation } from 'react-apollo';
import { send } from 'xstate';
import { Contact } from '../models/contact';

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
		saveContact:  (ctx:any,e:any) => {
			ctx.newContact = e.newContact;
		},
		loadContacts: (ctx:any,e:any) => {
			ctx.router.push('/');
			send('LOAD_CONTACT_LIST',ctx.router);
			ctx.selectedContact = new Contact();
			ctx.successMessage = '';
			ctx.errorMessage='';
			ctx.selectedId='';
			ctx.newContact= new Contact();
		},
		contactSelected: (ctx:any,e:any) =>{
			ctx.selectedContact = e.contact
		},
		updateContact: (ctx:any,e:any) =>{
			ctx.selectedContact[e.name] = e.value;
		},
		noteValidationError: (ctx:any,e:any) =>{
			ctx.validationError = e;
		},
		setSuccessMessage:(ctx:any,e:any) =>{
			ctx.successMessage = e.message;
		},
	}
}