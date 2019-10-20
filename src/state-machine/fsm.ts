import { getContacts, saveContact, viewContact, updateContact } from './promises';
import { Contact } from './../models/contact';

import { Machine, send, assign } from "xstate";
import {actions} from './actions'
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
		errorMessage: undefined
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
									target: 'failure',
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
						DELETE_CONTACT: 'deleteContact'
					}
				},
				addContact:{
					on:{
						SAVE_NEW_BUTTON: {
							target:'saveContact',
							actions: ['saveContactAction']

						},
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
									target: 'failure',
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
									target: 'failure',
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
										target: 'failure',
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
							target: 'saveEdit'
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
									target: 'failure',
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
					on:{
						DELETED: 'loading',
						BACK_BUTTON: 'loading'
					}
				},
				failure:{}
			},
		}
,
actions
);