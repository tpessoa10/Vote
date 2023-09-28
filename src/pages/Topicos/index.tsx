import { useEffect, useState } from "react";
import Botao from "../../components/Botao";
import Topico from "../../components/Topico";
import styles from './Topicos.module.css'
import {Link} from 'react-router-dom'

interface ItemProps{
   id:string
   titulo:string,
   conteudo:string,
   data:string,
   likes:number
   dislikes: number,
   saldo: number
}

export default function Topicos(){
   const [data, setData] = useState<ItemProps[]>([])

   useEffect(() =>{
      fetch('http://localhost:3000/topicos')
      .then((response) => response.json())
      .then(data => {
         setData(data)
         console.log(data)
      })
      .catch(error => {
         console.log(error)
      })
   }, [])

    return (
       <>
            <div className={styles.botaoDiv}>
               <Link to="/form">
                  <Botao>Criar Post</Botao>
               </Link>
            </div>
        <div className={styles.main}>
            <ul>
               {data.map(item => (
                  <Topico key={item.id} id={item.id} titulo={item.titulo} conteudo={item.conteudo} data={item.data} likes={item.likes} dislikes={item.dislikes} saldo={item.saldo}/>
               ))}
            </ul>
        </div>
       </> 
    )
}