import { useEffect, useState } from "react"
import { FaMoneyBillAlt, FaHeart, FaRegHeart} from 'react-icons/fa'
import { BiTimeFive } from 'react-icons/bi'
import Activity from '../Itineraries/Activity'
import Comments from "./Comments"
import { connect } from "react-redux"
import itinerariesActions from "../../redux/actions/itinerariesActions"
import { toast } from "react-toastify"

const Itinerary = (props) => {
    const {itinerary, usuarioLogueado, cityName} = props
    const [visible, setVisible] = useState(false)
    const [itinerariesLikes, setItinerariesLikes] = useState(itinerary.userLiked)
    const [color, setColor] = useState(false)
    const [loadingHeart, setLoadingHeart] = useState(true)
    const [comments, setComments] = useState(itinerary.comments)

    useEffect(()=>{
        usuarioLogueado ? (itinerariesLikes.includes(usuarioLogueado.email) && setColor(true)) : setColor(false)
    }, [itinerariesLikes])

    const likes = async () => {
        if (!usuarioLogueado) {
            toast.error("You must be logged in to like a post")
        } else{
            setLoadingHeart(false)
            const response = await props.like(usuarioLogueado.token, itinerary._id)
            setItinerariesLikes(response.userLiked)
            setColor(response.heart)
            setLoadingHeart(true)
        }
    }
    return (
        <div className="contenedorInfoItinerario">
            <div className="itinerarioFlex">
                <div className="fotoItinerario" style={{ backgroundImage: `url('${itinerary.itineraryImage}')` }}></div>
                <div className="contenidoInternoItinerario">
                    <div className="autorItinerario">
                        <img className="authorImage" src={itinerary.authorImage} alt="authorImage"/>
                        <span className="authorName">{itinerary.authorName}</span>
                    </div>
                    <div className="tituloItinerarioIcono">
                        <h2 className="tituloItinerario">{itinerary.tittle}</h2>
                        <span className="contenedorIconoLikes">
                            <div onClick={(loadingHeart ? likes : null)}>
                                {color ? <FaHeart className="iconoCorazon"/> : <FaRegHeart className="iconoCorazon"/>}
                            </div>
                            <p>{itinerariesLikes.length}</p>
                        </span>
                    </div>
                    <p className="descripcionItinerario">{itinerary.description}</p>
                    <span className="hashtags">{itinerary.hashtags.map((hashtag, index) => <p key={index}>{hashtag}</p>)}</span>
                    <div className="iconosFlex">
                        <span>Price: {[...Array(itinerary.price)].map((cash, index) => {
                            return <FaMoneyBillAlt className="iconoBilletes" key={index} />
                        })}
                        </span>
                        <span><BiTimeFive className="iconoReloj" /> {itinerary.duration} hours</span>
                    </div>
                </div>
            </div>
            <div className="contenedorUnderConstruction">
                {visible && (
                    <>
                    <div className="contenedorHeroActivities">
                        <h2 className="tituloActivities">Activities to do in {cityName}</h2>
                        <div className="borderClass"></div>
                    </div>
                    <div className="contenedorActCom">
                        <Comments itinerary={itinerary._id} comments={comments} setComments={setComments}/>
                        <Activity itinerary={itinerary._id}/>
                    </div>
                    </>
                )}
            </div>
            <div className="contenedorBotonViewMore">
                <button onClick={()=> setVisible(!visible)} className="botonViewMore">{visible ? 'View Less' : 'View More'}</button>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return{
        usuarioLogueado: state.userReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    like: itinerariesActions.like,
    cargarActividades: itinerariesActions.cargarActividades
}
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)