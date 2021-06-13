
import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  Filter,
  SearchInput,
  EmailField,
  EditButton,
  DeleteButton,
} from 'react-admin'

const AdminFilter = (props) => (
  <Filter {...props}>
    <SearchInput placeholder='Admin username' source='username' alwaysOn />
  </Filter>
)

const AdminList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='email' />
        <TextField source='username' />
        <EditButton basePath='/admins' />
        <DeleteButton basePath='/admins' />
      </Datagrid>
    </List>
  )
}

export default AdminList