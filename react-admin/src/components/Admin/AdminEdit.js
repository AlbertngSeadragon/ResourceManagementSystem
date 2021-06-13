import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin'

const AdminEdit = (props) => {
  return (
    <Edit title='Edit Admin' {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
        <TextInput source='email' />
        <TextInput source='username' />
        <TextInput source='password' />
      </SimpleForm>
    </Edit>
  )
}

export default AdminEdit