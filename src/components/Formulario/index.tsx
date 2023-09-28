import { ChangeEvent, useState } from 'react'
import Botao from '../Botao'
import styles from './Formulario.module.css'
import {v4 as uuid} from 'uuid'
import {useNavigate} from 'react-router-dom'

interface dataProps{
    id:string
    titulo:string,
    conteudo:string,
    data:string,
    likes:number

}

export default function Formulario(){

    const [titulo, setTitulo] = useState('')
    const [conteudo, setConteudo] = useState('')
    const navigate = useNavigate()

    const tituloSubmit = (event:ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
       setTitulo(event.target.value)
    }

    const conteudoSubmit = (event:ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        setConteudo(event.target.value)
    }

    
    
    const HandleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
       event.preventDefault()
       const novoId = uuid()
       const dataAtual = new Date().toLocaleDateString('pt-br')
       const likes = 0

        const data:dataProps = {
            id:novoId,
            titulo:titulo,
            conteudo:conteudo,
            data:dataAtual,
            likes:0
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
        setConteudo('')
        setTitulo('')
        navigate(-1)
    }



    return(
        <div className={styles.main}>
            <form onSubmit={HandleSubmit}>
                <div className={styles.input}>
                    <label htmlFor="titulo"></label>
                    <input type="text" placeholder='Assunto da postagem' value={titulo} onChange={tituloSubmit} name="titulo"/>
                </div>
                <div className={styles.textarea}>
                    <textarea name="texto" cols={70} rows={10} value={conteudo} onChange={conteudoSubmit} placeholder="Conteúdo da postagem"></textarea>
                    <label htmlFor="texto"></label>
                </div>
                <Botao type='submit'>Enviar</Botao>
            </form>
        </div>
    )
}

function uuidv4() {
    throw new Error('Function not implemented.')
}
