import Botao from "../../components/Botao";
import Topico from "../../components/Topico";
import styles from './Topicos.module.css'
import {Link} from 'react-router-dom'

export default function Topicos(){
    return (
       <>
            <div className={styles.botaoDiv}>
               <Link to="/form">
                  <Botao>Criar Post</Botao>
               </Link>
            </div>
        <div className={styles.main}>
            <Topico/>
            <Topico/>
            <Topico/>
        </div>
       </> 
    )
}