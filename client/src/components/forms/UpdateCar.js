import { useMutation, useQuery } from "@apollo/client"
import { Form, Input, Button, Select, InputNumber } from "antd"
import { useState, useEffect } from "react"
import { UPDATE_CAR, GET_PEOPLE } from "../../queries"

const UpdateCar = props => {
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const [UpdateCar] = useMutation(UPDATE_CAR)
    const { loading, error, data } = useQuery(GET_PEOPLE)

    useEffect(() => {
        forceUpdate()
    }, [])

    const handleChange = (value: String) => {
        console.log(value)
    }

    const onFinish = values => {
        const { year, make, model, price, personId } = values
        UpdateCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            }
        })
        props.onButtonClick()
    }

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable, value)
        switch(variable){
            case 'year':
                setYear(value)
                break
            case 'make':
                setMake(value)
                break
            case 'model':
                setModel(value)
                break
            case 'price':
                setPrice(value)
                break
            case 'personId':
                setPersonId(value)
            default:
                break
        }
    }
 
    return(
        <Form
            form={form}
            name='update-car-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                year: year,
                make: make,
                model: model,
                price: price,
                personId: personId
            }}
        >
            <Form.Item
                label="Year"
                name='year'
                rules={[{ required: true, message: 'Please input the car year!' }]}
                >
                <InputNumber 
                    placeholder='Year' 
                    onChange={e => updateStateVariable('year', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Make"
                name='make'
                rules={[{ required: true, message: 'Please input your car make!' }]}
            >
                <Input 
                    placeholder='Make'
                    onChange={e => updateStateVariable('make', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Model"
                name='model'
                rules={[{ required: true, message: 'Please input your car model!' }]}
            >
                <Input 
                    placeholder='Model'
                    onChange={e => updateStateVariable('model', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Price"
                name='price'
                rules={[{ required: true, message: 'Please input your car price!' }]}
            >
                <InputNumber
                    prefix="$"
                    onChange={e => updateStateVariable('price', e.target.value)}
                />
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
                            !form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price') && !form.isFieldTouched('personId')  || form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Car
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>
                Cancel
            </Button>
        </Form>
    )
}

export default UpdateCar