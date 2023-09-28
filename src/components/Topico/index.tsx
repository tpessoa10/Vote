import styled from 'styled-components'
import {IoThumbsUp, IoThumbsDown} from 'react-icons/io5'
import { useEffect, useState } from 'react'
import styles from './Topico.module.css'


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

      useEffect(() => {
      fetch(`http://localhost:3000/topicos/${id}`)
      .then((response) => response.json())
      .then(data => {
         setContadorLike(data.likes)
         setContadorDislike(data.dislikes)
         //calculaSaldo(data.likes, data.dislikes)
         setSaldoLikes(data.likes - data.dislikes)
         console.log('saldo= ',data.saldo)
      })
      .catch(error => {
         console.log(error)
      })
   }, []
    )

    const incrementaLike = async () => {
      const novoLikes = contadorLike + 1
      const novoSaldo = novoLikes - contadorDislike
        /*setContadorLike(contadorLike = contadorLike + 1)
        incrementaSaldo()*/
        await fetch(`http://localhost:3000/topicos/${id}`,{
          method:'PATCH',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify({
            likes: novoLikes,
            saldo: novoSaldo
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          setContadorLike(novoLikes)
          setSaldoLikes(novoSaldo)
          //setSaldoLikes(data.saldo)
          console.log(contadorLike)
        })
        .catch((error) =>{
          console.log(error)
        })
    }

    const incrementaDislike = async () => {
      const novoDislike = contadorDislike + 1
      const novoSaldo = saldoLikes - 1
        /*setContadorDislike(contadorDislike = contadorDislike + 1)
        incrementaSaldo()*/
        await fetch(`http://localhost:3000/topicos/${id}`,{
          method:'PATCH',
          headers:{
            'Content-type':'application/json',
          },
          body:JSON.stringify({
            dislikes: novoDislike,
            saldo: novoSaldo
          })
        })
        .then((response) => response.json())
        .then((data) => {
          setContadorDislike(novoDislike)
          setSaldoLikes(novoSaldo)
          //setSaldoLikes(data.saldo)
        })
    }

  /*const calculaSaldo = (likes:number, dislikes:number) => {
    const saldo = contadorLike - contadorDislike
    setSaldoLikes(saldo)
    fetch(`http://localhost:3000/topicos/${id}`,{
      method:'PACTH',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        saldo: saldoLikes
      })
    })
    .then((response) => response.json())
    .then((data) => {
      setSaldoLikes(data.saldo)
    })
    .catch((error) => {
      console.log(error)
    })
  }*/


    return (
        <div>
            <div>
                <h2>{titulo}</h2>
                <p>{conteudo}</p>
                <div className={styles.likes}>
                    <BotaoLike onClick={incrementaLike}><IoThumbsUp/>{contadorLike}</BotaoLike>
                    <BotaoDislike onClick={incrementaDislike}><IoThumbsDown/>{contadorDislike}</BotaoDislike>
                <div>{saldoLikes >=0 ? <SaldoSpan cor='green'>{saldoLikes}</SaldoSpan> : <SaldoSpan cor='red'>{saldoLikes}</SaldoSpan>}</div>
                </div>
                <span>{data}</span>
                <br />
            </div>
        </div>
    )
}