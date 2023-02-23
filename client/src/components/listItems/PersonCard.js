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

const PersonCard = props => {
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const styles = getStyles()

    const [editMode, setEditMode ] = useState(false)

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
            </Card>
            )}
        </div>
    )
}

export default PersonCard