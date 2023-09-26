import { ChangeEvent, useState } from 'react'
import Botao from '../Botao'
import styles from './Formulario.module.css'



export default function Formulario(){

    const [titulo, setTitulo] = useState('')
    const [conteudo, setConteudo] = useState('')

    const tituloSubmit = (event:ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
       setTitulo(event.target.value)
    }

    const conteudoSubmit = (event:ChangeEvent<HTMLTextAreaElement>){
        event.preventDefault()
        setConteudo(event.target.value)
    }

    const topico = {
        titulo:titulo,
        conteudo:conteudo
    }
    
    const HandleSubmit = () => {
        fetch("http://localhost:3000/topicos",{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(topico)
        })
        .then((response) => response.json())
        .then((topico) => {
            console.log(topico)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <div className={styles.main}>
            <form>
                <div className={styles.input}>
                    <label htmlFor="titulo"></label>
                    <input type="text" placeholder='Assunto da postagem' value={titulo} onSubmit={tituloSubmit} name="titulo"/>
                </div>
                <div className={styles.textarea}>
                    <textarea name="texto" cols='30' rows='10' value={conteudo} onChange={conteudoSubmit} placeholder="Conteúdo da postagem"></textarea>
                    <label htmlFor="texto"></label>
                </div>
                <Botao type='submit'>Enviar</Botao>
            </form>
        </div>
    )
}