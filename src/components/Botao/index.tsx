import styles from './Botao.module.css'

interface BotaoProps{
    children:React.ReactNode
}

export default function Botao({children}:BotaoProps){
    return (
        <div>
            <button className={styles.botao}>{children}</button>
        </div>
    )
}