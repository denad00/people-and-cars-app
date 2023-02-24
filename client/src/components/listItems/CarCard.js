import { Card } from "antd"
import { EditOutlined } from '@ant-design/icons'

import RemovePerson from '../buttons/RemovePerson'
import { useState } from "react"
import UpdatePerson from "../forms/UpdatePerson"

const getStyles = () => ({
    card:{
        width: '500px'
    }
})

const CarCard = props => {
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const styles = getStyles()

    const [editMode, setEditMode ] = useState(false)

    const handleButtonClick = () => {
        setEditMode(!editMode)
        console.log(editMode)
    }

    // const updateStateVariable = (variable, value) => {
    //     switch(variable){
    //         case 'firstName':
    //             setFirstName(value)
    //             break
    //         case 'lastName':
    //             setLastName(value)
    //             break
    //         default:
    //             break
    //     }
    // }

    return(
        <div>
            {editMode ? (
                <UpdatePerson 
                    onButtonClick={handleButtonClick}
                    id={props.id}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    // updateStateVariable={updateStateVariable}
                />
            ) : (
            <Card 
            style={styles.card}
            actions={[
                <EditOutlined key='edit' onClick={handleButtonClick} />,
                <RemovePerson id={id}/>
            ]}
            >
            {year} {make} {model} -> $ {price}
            </Card>
            )}
        </div>
    )
}

export default CarCard