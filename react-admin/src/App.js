import React from 'react'
import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import { fetchUtils } from 'ra-core';
//import lb4Provider from 'react-admin-lb4'

import AdminList from './components/Admin/AdminList'
import AdminCreate from './components/Admin/AdminCreate'
import AdminEdit from './components/Admin/AdminEdit'

import ProfessorList from './components/Professor/ProfessorList'
import ProfessorCreate from './components/Professor/ProfessorCreate'
import ProfessorEdit from './components/Professor/ProfessorEdit'

import GoStaffList from './components/GoStaff/GoStaffList'
import GoStaffCreate from './components/GoStaff/GoStaffCreate'
import GoStaffEdit from './components/GoStaff/GoStaffEdit'


function App() {
  return (
    <Admin dataProvider={simpleRestProvider('http://localhost:3005')}>
      <Resource
        name='admins'
        list={AdminList}
        create={AdminCreate}
        edit={AdminEdit}
      />
      <Resource
        name='professors'
        list={ProfessorList}
        create={ProfessorCreate}
        edit={ProfessorEdit}
      />
      <Resource
        name='general_office_go_staffs'
        list={GoStaffList}
        create={GoStaffCreate}
        edit={GoStaffEdit}
      />
    </Admin>
  )
}

export default App;
