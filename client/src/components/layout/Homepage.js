import AddCar from '../forms/AddCar';
import People from '../lists/People';
import Title from './Title';
import AddPerson from '../forms/AddPerson';

const Homepage = () => {

    return(
        <div className="homepage">
            <Title />
            <AddPerson />
            <AddCar />
            <People />
        </div>
    )
}

export default Homepage