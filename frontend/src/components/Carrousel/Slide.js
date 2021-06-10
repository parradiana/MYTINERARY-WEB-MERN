const Slide = (props) => {
    const {array} = props
    return (
        <>
        {array.map(ciudad =>  {
            return <div key = {ciudad.id} className="portaFoto" style={{backgroundImage: `url('${ciudad.imagen}')`}}>
                    <div className="nombresCiudades">{ciudad.nombre}</div>
                </div>
        })}
        </>
    )
}
export default Slide
