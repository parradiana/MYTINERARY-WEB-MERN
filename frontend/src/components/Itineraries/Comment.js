import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import { IoSend } from 'react-icons/io5'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Comment = (props) => {
    const { comment, updatedComment, deleteComment, usuarioLogueado } = props
    const [commentContent, setCommentContent] = useState(comment.comment)
    const [visible, setVisible] = useState(false)
    const [enabledUser, setEnabledUser] = useState(false)
    const [updateComment, setUpdateComment] = useState(false)

    useEffect(() => {
        if (usuarioLogueado && usuarioLogueado.email === comment.userId.email) {
            setEnabledUser(true)
        }
    }, [])
    alert = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this comment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                MySwal.fire(
                'Deleted!',
                'Your comment has been deleted.',
                'success'
              ).then(
                deleteComment(comment._id)
              )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                MySwal.fire(
                'Cancelled',
                'Your comment is safe :)',
                'error'
              )
            }
          })
    }
    const sendEnter = (e) => {
        console.log(e.key)
        if (e.key === 'Enter') {
            updatedComment(commentContent, comment._id)
            setVisible(false)
            setUpdateComment(!updateComment)
        }
    }
    
    return (
        <div className="contenedorInfo">
            <div className="datosUserComment">
                <img className="imageAuthorComment" src={comment.userId.image} alt="" />
                <div>
                    <p>{comment.userId.firstname} {comment.userId.lastname}</p>
                </div>
            </div>
            <div className="contenedorComment">
                {!updateComment
                    ? <div className="nameComment">
                        <p>{comment.comment}</p>
                    </div>
                    : <div className="contenedorInputEdit">
                        <input type="text" value={commentContent} onChange={e => setCommentContent(e.target.value)} onKeyDown={sendEnter} />
                        <IoSend className="iconSendEdit" onClick={() => { updatedComment(commentContent, comment._id); setVisible(false); setUpdateComment(!updateComment) }} />
                    </div>

                }
                {
                    enabledUser &&
                    <div className="contenedorButtonsOptions">
                        <div onClick={() => { setUpdateComment(!updateComment) }}>
                            {!updateComment ? <FaPencilAlt /> : <TiDelete />}
                        </div>
                        <FaTrashAlt onClick={() => { alert() }}></FaTrashAlt>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        usuarioLogueado: state.userReducer.usuarioLogueado
    }
}
export default connect(mapStateToProps)(Comment)