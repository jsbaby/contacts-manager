import { getContacts, saveContact } from './promises';
import { Contact } from './../models/contact';

import { Machine, send, assign } from "xstate";
import {actions} from './actions'
export const machine = Machine({
    id: 'ContactManagerApp',
	initial: 'loadRoute',
	context:{
		contacts: new Array<Contact>(),
		selectedContact: undefined,
		newContact: new Contact(),
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
						VIEW_CONTACT: 'viewContact',
						EDIT_CONTACT: 'editScreenLoaded',
						DELETE_CONTACT: 'deleteContactTriggered'
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
					on:{
						BACK_BUTTON: 'loading'
					}
				},
				editScreenLoaded:{
				on:{
					EDIT_SAVE_BUTTON: 'loading',
					BACK_BUTTON: 'loading'
				}
				},
				deleteContactTriggered:{
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