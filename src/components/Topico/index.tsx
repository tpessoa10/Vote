import styled from 'styled-components'
import {IoThumbsUp, IoThumbsDown} from 'react-icons/io5'
import { useEffect, useReducer } from 'react'
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

const reducer = (state:any, action:any) => {
  switch(action.type){
    case "incrementaLike":
      return {...state, 
        contadorLike: state.contadorLike + 1,
        saldo: state.saldo + 1
      }
    case "incrementaDislike":
      return {...state, 
        contadorDislike: state.contadorDislike + 1,
        saldo: state.saldo - 1
      }
      case 'setInitialValues':
        return {
          ...state,
          ...action.payload,
        };
    default:
      return state
  }
}

export default function Topico({id, titulo, conteudo, data}:TopicoProps){
  const [state, dispatch] = useReducer(reducer, {
    contadorLike: 0,
    contadorDislike: 0,
    saldo: 0
  })

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

        dispatch({
          type:'setInitialValues',
          payload:{
            contadorLike: data.likes,
            contadorDislike: data.dislikes,
            saldo: data.likes - data.dislikes
          }
        })
        
      })
      .catch(error => {
         console.log(error)
      })
   }, []
    )

    const incrementaLike = async () => {
      const novoLikes = state.contadorLike + 1
      const novoSaldo = novoLikes - state.contadorDislike
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
        .then(() => {
          dispatch({type: 'incrementaLike'})
        })
        .catch((error) =>{
          console.log(error)
        })
    }

    const incrementaDislike = async () => {
      const novoDislike = state.contadorDislike + 1
      const novoSaldo = state.saldo - 1
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
        .then(() => {
          dispatch({type: 'incrementaDislike'})
        })
    }

    return (
        <div>
            <div className={styles.main}>
                <h2>{titulo}</h2>
                <p>{conteudo}</p>
                <div className={styles.likes}>
                    <BotaoLike onClick={incrementaLike}><IoThumbsUp/>{state.contadorLike}</BotaoLike>
                    <BotaoDislike onClick={incrementaDislike}><IoThumbsDown/>{state.contadorDislike}</BotaoDislike>
                <div>{state.saldo >=0 ? <SaldoSpan cor='green'>{state.saldo}</SaldoSpan> : <SaldoSpan cor='red'>{state.saldo}</SaldoSpan>}</div>
                </div>
                <span>{data}</span>
                <br />
            </div>
        </div>
    )
}

