import styled from 'styled-components'
import {IoThumbsUp, IoThumbsDown} from 'react-icons/io5'
import { useState } from 'react'
import styles from './Topico.module.css'

export default function Topico(){

    var [contadorLike, setContadorLike] = useState<number>(0)
    var [contadorDislike, setContadorDislike] = useState<number>(0)
    const [saldo, setSaldo] = useState<number>(0)

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

    const incrementaLike = () => {
        setContadorLike(contadorLike = contadorLike + 1)
        incrementaSaldo()
    }

    const incrementaDislike = () => {
        setContadorDislike(contadorDislike = contadorDislike + 1)
        incrementaSaldo()
    }

    const incrementaSaldo = () => {
        setSaldo(contadorLike - contadorDislike)
    }

    return (
        <div>
            <div>
                <h2>Topico</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi exercitationem nemo, 
                    ab atque voluptate aperiam quis ad fugiat ipsam quia illum quibusdam consequuntur, dolores nam sunt tenetur maxime aut.</p>
                <div className={styles.likes}>
                    <BotaoLike onClick={incrementaLike}><IoThumbsUp/>{contadorLike}</BotaoLike>
                    <BotaoDislike onClick={incrementaDislike}><IoThumbsDown/>{contadorDislike}</BotaoDislike>
                <div>{saldo >=0 ? <SaldoSpan cor='green'>{saldo}</SaldoSpan> : <SaldoSpan cor='red'>{saldo}</SaldoSpan>}</div>
                </div>
                <span>25/09/2023</span>
                <br />
                <span>Thiago, Teresina, Brasil</span>
            </div>
        </div>
    )
}