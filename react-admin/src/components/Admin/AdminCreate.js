import React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin'

const AdminCreate = (props) => {
  return (
    <Create title='Create a Admin' {...props}>
      <SimpleForm>
        <TextInput source='email' />
        <TextInput source='username' />
        <TextInput source='password' />
      </SimpleForm>
    </Create>
  )
}

export default AdminCreate