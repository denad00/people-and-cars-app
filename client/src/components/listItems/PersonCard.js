import { Card } from "antd"
import { EditOutlined } from '@ant-design/icons'
import CarCard from "./CarCard"
import { GET_CARS } from "../../queries"
import { useQuery } from "@apollo/client"

import RemovePerson from '../buttons/RemovePerson'
import { useState } from "react"
import UpdatePerson from "../forms/UpdatePerson"

const getStyles = () => ({
    card:{
        width: '500px'
    }
})

const PersonCard = props => {
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const styles = getStyles()

    const [editMode, setEditMode ] = useState(false)

    const { loading, error, data } = useQuery(GET_CARS)
    console.log(id)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const handleButtonClick = () => {
        setEditMode(!editMode)
        console.log(editMode)
    }

    const updateStateVariable = (variable, value) => {
        switch(variable){
            case 'firstName':
                setFirstName(value)
                break
            case 'lastName':
                setLastName(value)
                break
            default:
                break
        }
    }

    return(
        <div>
            {editMode ? (
                <UpdatePerson 
                    onButtonClick={handleButtonClick}
                    id={props.id}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    updateStateVariable={updateStateVariable}
                />
            ) : (
            <Card
            style={styles.card}
            actions={[
                <EditOutlined key='edit' onClick={handleButtonClick} />,
                <RemovePerson id={id}/>
            ]}
            >
            {firstName} {lastName}
            {data.cars.map((car) => car.personId === id ? 
                    <CarCard key={car.id} id={car.id} year={car.year} make={car.make} model={car.model} price={car.price}/> : null
                )}
            </Card>
            )}
        </div>
    )
}

export default PersonCard