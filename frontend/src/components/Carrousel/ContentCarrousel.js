import Carousel from 'react-elastic-carousel'
import Slide from './Slide'
const ContentCarrousel = ({contenidoCarrousel}) => {
    return (
        <div className="cajaGrandeCarrousel">
            <div className="contenedorTituloCarrousel">
                <h1 className="tituloCarrousel">Popular <span className="colorTituloCarrousel">MYtineraries</span></h1>
            </div>
            <Carousel enableAutoPlay autoPlaySpeed={6000}>
                {contenidoCarrousel.map(array => <div key={array[0].nombre} className="contenedorCarrousel"><Slide array={array} /></div>)}
            </Carousel>
        </div>

    )
}
export default ContentCarrousel