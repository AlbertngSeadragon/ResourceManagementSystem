import React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin'

const ProfessorCreate = (props) => {
  return (
    <Create title='Create a Professor' {...props}>
      <SimpleForm>
        <TextInput source='email' />
        <TextInput source='username' />
        <TextInput source='password' />
      </SimpleForm>
    </Create>
  )
}

export default ProfessorCreate