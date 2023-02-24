import { Button, Divider, List } from "antd"
import { PERSON_WITH_CARS } from "../../queries"
import { useQuery } from "@apollo/client"
import { useLocation, useNavigate } from 'react-router-dom';
import CarCard from "../listItems/CarCard";

const Detail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state.id);

    const { loading, error, data } = useQuery(PERSON_WITH_CARS)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    console.log(data.cars)

    const goHome = () => {
        console.log('hello')
        navigate(`/`)
    }

    return(
        <div className="details">
            {data.people.map((person) => person.id === location.state.id ? <Divider plain>{person.firstName} {person.lastName}</Divider>: null)}
            <List>
            {data.cars.map((car) => car.personId === location.state.id ? 
            <List.Item>
                {car.year} {car.make} {car.model} -> $ {car.price}
            </List.Item> : null)}
            </List>

            <Button
                type="primary"
                onClick={goHome}
            >Go Home</Button>
        </div>
    )
}

export default Detail