import brujula from '../../assets/brujula.png'
import salvavidas from '../../assets/impecableservicio.png'
import impecableServicio from '../../assets/salvavidas.png'
const CallToAction = () => {
    return (
        <>
            <div className="callToAction">
                <h1>WHY CHOSE US?</h1>
                <div className="contenedorEspecialidades">
                    <div className="elegirnos">
                        <img className="logosCallToAction" src={brujula} alt="brujula" />
                        <span className="subtitulos">ADVENTURE</span>
                        <span className="textospan">From whitewater, rock climbing, canoeing, to snowboard, ski and marcial arts</span>
                    </div>
                    <div className="elegirnos">
                        <img className="logosCallToAction" src={salvavidas} alt="salvavidas" />
                        <span className="subtitulos">FUN & SAFETY</span>
                        <span className="textospan">Whe have designed terms and security protocols for you to only enjoy the journey</span>
                    </div>
                    <div className="elegirnos">
                        <img className="logosCallToAction" src={impecableServicio} alt="impecableservicio" />
                        <span className="subtitulos">IMPECCABLE SERVICE</span>
                        <span className="textospan">The chance to travel with knowledgable local guides off the common tourist trails</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CallToAction