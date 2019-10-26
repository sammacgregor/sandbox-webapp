import React from 'react';
import AppBar from '../../Common/Components/AppBar';
import MemberSearch from './Components/MemberSearch';


export default function CustomerDashboard() {

  return (
    <div>
      <AppBar isAuthenticated = {true} />
      <MemberSearch />
    </div>
  );
}