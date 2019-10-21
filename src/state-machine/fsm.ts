import { getContacts, saveContact, viewContact, updateContact, deleteContact } from './promises';
import { Contact } from './../models/contact';

import { Machine, send, assign } from "xstate";
import {actions} from './actions';

const isValidContact = (ctx:any,e:any) => {
								var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
								const result = e.newContact.name !=='' && e.newContact.email!=='' && re.test(e.newContact.email);
								if(result===false) ctx.errorMessage = 'Invalid input';
								if(result===true) ctx.errorMessage = '';
								return result;
							}


export const machine = Machine({
    id: 'ContactManagerApp',
	initial: 'loadRoute',
	context:{
		contacts: new Array<Contact>(),
		selectedContact: new Contact(),
		newContact: new Contact(),
		selectedId:'',
		router: {
			push:(s:string)=>{}
		},
		errorMessage: '',
		successMessage: ''
	},
	states: {
				loadRoute:{
					on:{
						LOAD_CONTACT_LIST: {
							target: 'loading',
							actions:['saveRouter']
						},
						ADD_CONTACT: {
							target:'addContact',
							actions:['saveRouter']
						},
						VIEW_CONTACT: {
							target:'viewContact',
							actions:['saveRouter','getSelectedId']
						},
						EDIT_CONTACT: {
							target:'editContact',
							actions:['saveRouter','getSelectedId']
						}

					}
				},
				loading:{
					invoke:{
								id: 'getContacts',
								src: getContacts,	
								onError: {
									target: 'loading',
									actions: assign({ 
										errorMessage: (ctx:any, e:any) =>  e.data.message
									})
								},
								onDone: {
									target: 'contactListLoaded',
									actions: assign({ contacts: (ctx: any, e:any) => e.data.data.contacts})
							}
					}
				},
				contactListLoaded:{
					on:{
						SELECT_CONTACT: {
							target: 'contactSelected',
							actions:['contactSelected']
						},
						ADD_CONTACT: {
							target:'addContact',
							actions:['addContact']
						}
					}
				},
				contactSelected:{
					on:{
						ADD_CONTACT: {
							target:'addContact',
							actions:['addContact']
						},
						VIEW_CONTACT: {
							target: 'loadRoute',
							actions:['viewContact']
						},
						EDIT_CONTACT: {
							target: 'loadRoute',
							actions:['editContact']
						},
						DELETE_CONTACT: {
							target: 'deleteContact',

						}
					}
				},
				addContact:{
					on:{
						SAVE_NEW_BUTTON: [{
							target:'saveContact',
							cond: isValidContact,
							actions: ['saveContact','setSuccessMessage']
						},{
							target:'addContact',
							actions: ['validationError']
						}],
						BACK_BUTTON:{
							target:'exitToContactList',
						}
					}
				},
				exitToContactList:{
					entry: ['loadContacts']
				},
				saveContact:{
					invoke:{
								id: 'saveContact',
								src: saveContact,	
								onError: {
									target: 'saveContact',
									actions: assign({ 
										errorMessage: (ctx:any, e:any) =>  e.data.message
									})
								},
								onDone: {
									target: 'addContact'
								}
							}
				},
				viewContact: {
					invoke:{
						id: 'viewContact',
						src: (ctx:any,e:any)=>viewContact(ctx.selectedId),	
						onError: {
									target: 'viewContact',
									actions: assign({ 
										errorMessage: (ctx:any, e:any) =>  e.data.message
									})
								},
						onDone: {
								target: 'viewContactLoaded',
								actions: assign({ selectedContact: (ctx: any, e:any) => e.data.data.contact}),
						}
					}
				},
				viewContactLoaded:{
					on:{
						BACK_BUTTON:{
							target:'exitToContactList',
						}
					}
				},
				editContact:{
					invoke:{
							id: 'editContact',
							src: (ctx:any,e:any)=>viewContact(ctx.selectedId),	
							onError: {
										target: 'editContact',
										actions: assign({ 
											errorMessage: (ctx:any, e:any) =>  e.data.message
										})
									},
							onDone: {
									target: 'editContactLoaded',
									actions: assign({ selectedContact: (ctx: any, e:any) => e.data.data.contact}),
							}
						}
				},
				editContactLoaded:{
					on:{
						UPDATE_CONTACT:{
							actions:['updateContact']
						},
						SAVE_EDIT_BUTTON:{
							target: 'saveEdit',
							actions:['setSuccessMessage']
						},
						BACK_BUTTON:{
							target:'exitToContactList',
						}
					}
				},
				saveEdit:{
					invoke:{
								id: 'saveEdit',
								src: (ctx:any, e:any) => updateContact(ctx.selectedContact),	
								onError: {
									target: 'saveEdit',
									actions: assign({ 
										errorMessage: (ctx:any, e:any) =>  e.data.message
									})
								},
								onDone: {
									target: 'editContact'
								}
							}
				},
				deleteContact:{
					invoke:{
						id: 'deleteContact',
						src: (ctx:any, e:any) => deleteContact(ctx.selectedContact.id),	
						onError: {
									target: 'deleteContact',
									actions: assign({ 
										errorMessage: (ctx:any, e:any) =>  e.data.message
									})
						},
						onDone: {
									target: 'loadRoute',
									actions:['loadContacts']
								}
					}
				}
			},
		}
,
actions
);

