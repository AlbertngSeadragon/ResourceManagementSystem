
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

const GoStaffFilter = (props) => (
  <Filter {...props}>
    <SearchInput placeholder='GoStaff username' source='username' alwaysOn />
  </Filter>
)

const GoStaffList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='email' />
        <TextField source='username' />
        <EditButton basePath='/general_office_go_staffs' />
        <DeleteButton basePath='/general_office_go_staffs' />
      </Datagrid>
    </List>
  )
}

export default GoStaffList