import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries"

import { Button, Divider, Form, Input, InputNumber, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'

const AddCar = () => {
    const [id] = useState(uuidv4())
    const [addCar] = useMutation(ADD_CAR)

    const [form] = Form.useForm()
    const[, forceUpdate] = useState()

    const { loading, error, data } = useQuery(GET_PEOPLE)

    useEffect(() => {
        forceUpdate([])
    }, [])

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const handleChange = (value: String) => {
        console.log(value)
    }

    const onFinish = values => {
        const { year, make, model, price, personId } = values
        console.log('values', values)
        console.log(personId)
        console.log(id)

        addCar({
            variables:{
                id,
                year,
                make,
                model,
                price,
                personId
            },
            update: (cache, { data: {addCar} }) => {
                const data = cache.readQuery({query:GET_CARS})
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, addCar]
                    }
                })
            }
        })
    }

    return(
        <div className='add-car'>
            <Divider plain>Add Car</Divider>
            <Form 
                name='add-car-form' 
                form={form}
                layout='inline'
                style={{ marginBottom: '40px '}}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Year"
                    name='year'
                    rules={[{ required: true, message: 'Please input the car year!' }]}
                >
                    <InputNumber placeholder='Year'/>
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
                    <Input placeholder='Model' />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name='price'
                    rules={[{ required: true, message: 'Please input your car price!' }]}
                >
                    <InputNumber prefix="$"/>
                </Form.Item>
                <Form.Item
                    label="Person"
                    name='personId'
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