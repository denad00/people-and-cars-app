import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Button, Form, Input } from 'antd'

const AddPerson = () => {
    const [id] = useState(uuidv4())

    const [form] = Form.useForm()

    return(
        <div className='add-person'>
            <h2>Add Person</h2>
            <Form 
                name='add-person-form' 
                form={form}
                layout='inline'
                size='large'
                style={{ marginBottom: '40px '}}
            >
                <Form.Item
                    name='firstName'
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input placeholder='i.e. John' />
                </Form.Item>
                <Form.Item
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