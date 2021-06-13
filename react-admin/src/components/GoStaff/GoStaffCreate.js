import React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin'

const GoStaffCreate = (props) => {
  return (
    <Create title='Create a GoStaff' {...props}>
      <SimpleForm>
        <TextInput source='email' />
        <TextInput source='username' />
        <TextInput source='password' />
      </SimpleForm>
    </Create>
  )
}

export default GoStaffCreate