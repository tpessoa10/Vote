import Botao from '../Botao'
import styles from './Formulario.module.css'

export default function Formulario(){

    const criarPost = () => {
        fetch("http://localhost:3000/topicos",{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            }
        })
    }

    return(
        <div className={styles.main}>
            <form>
                <div className={styles.input}>
                    <label htmlFor="titulo"></label>
                    <input type="text" placeholder='Assunto da postagem' name="titulo"/>
                </div>
                <div className={styles.textarea}>
                    <textarea name="texto" cols='30' rows='10' placeholder="Conteúdo da postagem"></textarea>
                    <label htmlFor="texto"></label>
                </div>
                <Botao>Enviar</Botao>
            </form>
        </div>
    )
}