import styled from 'styled-components'
import {IoThumbsUp, IoThumbsDown} from 'react-icons/io5'
import { useState } from 'react'
import styles from './Topico.module.css'
import {v4 as uuidv4} from 'uuid'
import axios from 'axios'

interface TopicoProps{
  id:string,
  titulo:string,
  conteudo:string,
  data:string,
  likes:number,
  dislikes:number,
  saldo:number
}

export default function Topico({id, titulo, conteudo, data, likes, dislikes, saldo}:TopicoProps){

    var [contadorLike, setContadorLike] = useState<number>(0)
    var [contadorDislike, setContadorDislike] = useState<number>(0)
    const [saldoLikes, setSaldoLikes] = useState<number>(0)

    const BotaoLike = styled.button`
    background-color: #fff;
    border: none;
    cursor: pointer;
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 4px;
    color: #333;
  
    &:hover {
      background-color: #f2f2f2;
    }
  
    &:focus {
      outline: none;
    }
  
    &.liked {
      background-color: #ffcc00;
      color: #fff;
    }
    `

    const BotaoDislike = styled.button`
    background-color: #fff;
    border: none;
    cursor: pointer;
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 4px;
    color: #333;
  
    &:hover {
      background-color: #f2f2f2;
    }
  
    &:focus {
      outline: none;
    }
  
    &.liked {
      background-color: #ffcc00;
      color: #fff;
    }
    `
    interface saldoSpanProps{
        cor:string
    }

    const SaldoSpan = styled.span<saldoSpanProps>`
        color:${({cor}) => cor}
    `


    const incrementaLike = async (id:string, body:string) => {
        /*setContadorLike(contadorLike = contadorLike + 1)
        incrementaSaldo()*/
        fetch(`http://localhosto:3000/topicos/${id}`,{
          method:'PATCH',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify({
            likes: contadorLike + 1
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          setContadorLike(data.likes)
        })
        .catch((error) =>{
          console.log(error)
        })
    }

    const incrementaDislike = () => {
        /*setContadorDislike(contadorDislike = contadorDislike + 1)
        incrementaSaldo()*/
        fetch(`http://localhost:3000/topicos/${id}`,{
          method:'PATCH',
          headers:{
            'Content-type':'application/json',
          },
          body:JSON.stringify({
            dislikes: contadorDislike + 1
          })
        })
        .then((response) => response.json())
        .then((data) => {
          setContadorDislike(data.dislikes)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    /*const incrementaSaldo = () => {
        setSaldo(contadorLike - contadorDislike)
    }*/



    return (
        <div>
            <div>
                <h2>{titulo}</h2>
                <p>{conteudo}</p>
                <div className={styles.likes}>
                    <BotaoLike onClick={incrementaLike}><IoThumbsUp/>{contadorLike}</BotaoLike>
                    <BotaoDislike onClick={incrementaDislike}><IoThumbsDown/>{contadorDislike}</BotaoDislike>
                <div>{saldo >=0 ? <SaldoSpan cor='green'>{saldo}</SaldoSpan> : <SaldoSpan cor='red'>{saldo}</SaldoSpan>}</div>
                </div>
                <span>{data}</span>
                <br />
            </div>
        </div>
    )
}