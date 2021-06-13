
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

const ProfessorFilter = (props) => (
  <Filter {...props}>
    <SearchInput placeholder='Professor username' source='username' alwaysOn />
  </Filter>
)

const ProfessorList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='email' />
        <TextField source='username' />
        <EditButton basePath='/professors' />
        <DeleteButton basePath='/professors' />
      </Datagrid>
    </List>
  )
}

export default ProfessorList