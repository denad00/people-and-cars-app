import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GET_PEOPLE } from "../../queries"

import { Button, Form, Input, Select } from 'antd'
import { useQuery } from '@apollo/client'

const AddCar = () => {
    const [id] = useState(uuidv4())

    const [form] = Form.useForm()
    const { loading, error, data } = useQuery(GET_PEOPLE)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const handleChange = (value: String) => {
        console.log(`selected ${value}`)
    }

    return(
        <div className='add-person'>
            <h2>Add Car</h2>
            <Form 
                name='add-person-form' 
                form={form}
                layout='inline'
                style={{ marginBottom: '40px '}}
            >
                <Form.Item
                    label="Year"
                    name='year'
                    rules={[{ required: true, message: 'Please input the car year!' }]}
                >
                    <Input placeholder='Year' />
                </Form.Item>
                <Form.Item
                    label="Make"
                    name='make'
                    rules={[{ required: true, message: 'Please input your car make!' }]}
                >
                    <Input placeholder='Make'/>
                </Form.Item>
                <Form.Item
                    label="Model"
                    name='model'
                    rules={[{ required: true, message: 'Please input your car model!' }]}
                >
                    <Input placeholder='Model'/>
                </Form.Item>
                <Form.Item
                    label="Price"
                    name='price'
                    rules={[{ required: true, message: 'Please input your car price!' }]}
                >
                    <Input prefix="$"/>
                </Form.Item>
                <Form.Item
                    label="Person"
                    name='person'
                    rules={[{ required: true, message: 'Please select the car owner!' }]}
                >
                    <Select
                        defaultValue='Select a person'
                        onChange={handleChange}
                    >
                        {data.people.map((option) => (
                            <Select.Option key={option.id} value={option.id}>{option.firstName} {option.lastName}</Select.Option>
                        ))}
                    </Select>
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
                            Add Car
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddCar