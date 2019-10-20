import { gql } from 'apollo-boost';
export const GET_CONTACTS = gql`
  query contactList{
    contacts{
        id
        name
        email
        }
    }
`;

export const VIEW_CONTACT = gql`
    query ($id:ID){
    contact(id:$id){
        id
        name
        email
    }
    }
`;

export const ADD_CONTACT = gql`
    mutation($contact:InputContact){
        addContact(contact:$contact){
            id
            name
            email
        }
    }   
`;

export const EDIT_CONTACT = gql`
  mutation($contact:InputContact){
    updateContact(contact:$contact){
        id
        name
        email
    }
  }   
`;

export const DELETE_CONTACT = gql`
    mutation($id:ID){
        deleteContact(id:$id)
    }   
`