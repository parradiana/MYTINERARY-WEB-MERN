import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import itinerariesActions from "../../redux/actions/itinerariesActions"
import preloader from '../../assets/preloader.png'
import Carousel from 'react-bootstrap/Carousel'
const Activity = (props) => {
    const {itinerary} = props
    const [activities, setActivities] = useState([])
    const actividades = async () => {
        const response = await props.cargarActividades(itinerary)
        setActivities(response.activities)
    }
    useEffect(() => {
        actividades()
    }, [])
    if (!activities) {
        return (
            <div className="preloader">
                <img src={preloader} alt="" />
            </div>
        )
    }

    return (
        <Carousel className="carrouselActivities">
            {activities.map(activity => {
                return (
                    <Carousel.Item interval={2000} key={activity._id}>
                        <div className="imageActivity" style={{ backgroundImage: `url('${activity.imageActivity}')` }} alt="" />
                        <Carousel.Caption className="caption">
                            <p>{activity.nameActivity}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}
const mapDispatchToProps = {
    cargarActividades: itinerariesActions.cargarActividades
}

export default connect(null, mapDispatchToProps)(Activity)