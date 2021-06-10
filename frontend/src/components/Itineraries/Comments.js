import { useEffect, useState } from "react"
import { connect } from "react-redux"
import itinerariesActions from "../../redux/actions/itinerariesActions"
import Comment from "./Comment"
import { IoSend } from 'react-icons/io5'
import Picker from 'emoji-picker-react';
import { toast } from "react-toastify"
import { GrEmoji } from 'react-icons/gr'
const Comments = (props) => {
    const { setComments, comments, usuarioLogueado } = props
    const [inputcomment, setInputComment] = useState({ comment: '', token: '' })
    const [loadingComments, setLoadingComments] = useState(true)
    const [chosenEmoji, setChosenEmoji] = useState(null)
    const [visible, setVisible] = useState(false)
    let input = usuarioLogueado ? { inputcomment: 'Leave a comment...', disabled: false } : { inputcomment: 'You must be logged in to post a comment', disabled: true }
    let buttonDisabled = inputcomment.comment ? false : true
    const leerInput = (e) => {
        setInputComment({
            ...inputcomment,
            comment: e.target.value,
            token: usuarioLogueado.token
        })
    }
    const sendComment = async (e) => {
        const spaceComment = inputcomment.comment.charAt(0)
        if (usuarioLogueado) {
            if (spaceComment === " " || inputcomment.comment === "") {
                toast.error("You can't post an empty comment")
            } else {
                setLoadingComments(false)
                const response = await props.cargarComentario(inputcomment, props.itinerary)
                console.log(response)
                setComments(response.comments)
                
                setInputComment({ comment: '', token: '' })
                setLoadingComments(true)
            }
            
        } else {
            toast.error("You must be logged in to post a comment")
        }
    }
    const updatedComment = async (comment, idComment) => {
        const response = await props.editarComentario(props.itinerary, comment, idComment)
        setComments(response)
    }
    const deleteComment = async (idComment) => {
        const response = await props.borrarComentario(props.itinerary, idComment)
        setComments(response.comments)
    }
    const sendEnter = (e) => {
        if (e.key === 'Enter') {
            sendComment()
        }
    }
    const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject)
    }
    useEffect(()=>{
        if (chosenEmoji) {
            setInputComment({
                ...inputcomment,
                comment: inputcomment.comment + chosenEmoji.emoji,
                token: usuarioLogueado.token
            })
        }
    },[chosenEmoji])
    
    return (
        <div className="contenedorComments">
            <div className="tituloComments">Comments <span>. {comments.length}</span></div>
            {comments.length === 0
                ? <div className="noComments">
                    <p>No comments yet</p>
                    <p>Be the first to post one!</p>
                </div>
                :
                <div className="comments">
                    {comments.map(comment => {
                        return (
                            <Comment key={comment._id} comment={comment} updatedComment={updatedComment} deleteComment={deleteComment} />
                        )
                    })}
                </div>
            }
            <div className="contenedorEmojis">{visible && <Picker onEmojiClick={onEmojiClick} className="emojis"/>}</div>
            <div className="contenedorInputComment">
                <input className="inputComment" type="text" placeholder={input.inputcomment} onKeyDown={sendEnter} value={inputcomment.comment} disabled={input.disabled} onChange={leerInput} />
                {usuarioLogueado && <GrEmoji onClick={()=> setVisible(!visible)} className="iconoEmoji" />}
                <IoSend onClick={loadingComments ? sendComment : null} disabled={buttonDisabled} className="iconSend" />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        usuarioLogueado: state.userReducer.usuarioLogueado
    }
}
const mapDispatchToProps = {
    cargarComentario: itinerariesActions.cargarComentario,
    editarComentario: itinerariesActions.editarComentario,
    borrarComentario: itinerariesActions.borrarComentario
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments)
