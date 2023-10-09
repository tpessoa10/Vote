import { ChangeEvent, useReducer} from 'react'
import Botao from '../Botao'
import styles from './Formulario.module.css'
import {v4 as uuid} from 'uuid'
import {useNavigate} from 'react-router-dom'

interface dataProps{
    id:string
    titulo:string,
    conteudo:string,
    data:string,
    likes:number,
    dislikes:number,
    saldo:number

}

const reducer = (state:any, action:any) => {
    switch(action.type){
        case 'setTitulo':
            return{...state,
                titulo:action.payload
            }
        case 'setConteudo':
            return{...state,
                conteudo:action.payload
        }
        case 'resetForm':{
            return{...state,
                titulo: '',
                conteudo:''
            }
        }
        default:
            return state
    }
}

export default function Formulario(){
    const [state, dispatch] = useReducer(reducer, {
        titulo: '',
        conteudo: ''
    })

    const navigate = useNavigate()

    const tituloSubmit = (event:ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        dispatch({type:'setTitulo', payload: event.target.value})
    }

    const conteudoSubmit = (event:ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        dispatch({type:'setConteudo', payload:event.target.value})
    }
 
    const HandleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
       event.preventDefault()
       const novoId = uuid()
       const dataAtual = new Date().toLocaleDateString('pt-br')

        const data:dataProps = {
            id:novoId,
            titulo:state.titulo,
            conteudo:state.conteudo,
            data:dataAtual,
            likes:0,
            dislikes:0,
            saldo:0
        }

        console.log(data)

        fetch("http://localhost:3000/topicos",{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
        dispatch({type:'resetForm'})
        navigate(-1)
    }

    return(
        <div className={styles.main}>
            <form onSubmit={HandleSubmit}>
                <div className={styles.input}>
                    <label htmlFor="titulo"></label>
                    <input type="text" placeholder='Assunto da postagem' value={state.titulo} onChange={tituloSubmit} name="titulo"/>
                </div>
                <div className={styles.textarea}>
                    <textarea name="texto" cols={70} rows={10} value={state.conteudo} onChange={conteudoSubmit} placeholder="Conteúdo da postagem"></textarea>
                    <label htmlFor="texto"></label>
                </div>
                <Botao type='submit'>Enviar</Botao>
            
            </form>
        </div>
    )
}


