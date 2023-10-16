import styles from './Botao.module.css'

interface BotaoProps{
    children:React.ReactNode,
    type?:"button" | "submit" | "reset"
}


export default function Botao({children, type}:BotaoProps){
    return (
        <div>
            <button type={type} className={styles.botao}>{children}</button>
        </div>
    )
}