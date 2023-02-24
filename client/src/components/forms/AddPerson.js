import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Button, Divider, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, GET_PEOPLE } from '../../queries'


const AddPerson = () => {
    const [id] = useState(uuidv4())
    const [addPerson] = useMutation(ADD_PERSON)

    const [form] = Form.useForm()
    const[, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate([])
    }, [])

    const onFinish = values => {
        const { firstName, lastName } = values
        console.log('values', values)

        addPerson({
            variables: {
                id,
                firstName,
                lastName
            },
            update: (cache, { data: {addPerson}}) => {
                const data = cache.readQuery({ query: GET_PEOPLE })
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, addPerson]
                    }
                })
            }
        })
    } 

    return(
        <div className='add-person'>
            <Divider plain>Add Person</Divider>
            <Form 
                name='add-person-form' 
                form={form}
                layout='inline'
                onFinish={onFinish}
                style={{ marginBottom: '40px '}}
            >
                <Form.Item
                    label="First Name"
                    name='firstName'
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input placeholder='i.e. John' />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name='lastName'
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <Input placeholder='i.e. Smith'/>
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={
                                !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Add Person
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddPerson