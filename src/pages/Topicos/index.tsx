import Topico from "../../components/Topico";
import styles from './Topicos.module.css'
export default function Topicos(){
    return (
       <>
        <div className={styles.main}>
           <Topico/>
           <Topico/>
           <Topico/>
        </div>
       </> 
    )
}