import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import NavBar from './components/Navbar/NavBar';
import ContactList from './components/contacts/ContactList/ContactList';
import AddContacts from './components/contacts/AddContacts/AddContacts';
import ViewContacts from './components/contacts/ViewContacts/ViewContacts';
import EditContacts from './components/contacts/EditContacts/EditContacts';



let App = () => {
  return (
    <React.Fragment>

      <NavBar />
      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list'} />} />
        <Route path={'/contacts/list'} element={<ContactList />} />
        <Route path={'/contacts/add'} element={<AddContacts />} />
        <Route path={'/contacts/view/:contactId'} element={<ViewContacts />} />
        <Route path={'/contacts/edit/:contactId'} element={<EditContacts />} />


      </Routes>

    </React.Fragment>
  );
}

export default App;
