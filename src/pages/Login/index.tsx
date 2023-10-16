import { Link, Navigate } from "react-router-dom";
import styles from './Login.module.css';
import { useAuth } from "../../utils/Auth";
import { useRef } from "react";

export default function Login({next = '/'}){

    const {signin, isAuthenticated} = useAuth()
    
    if(isAuthenticated){
        return <Navigate to={next}/>
    }

    const usernameInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)

    const handleLoginSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = usernameInputRef.current!.value
        const password = passwordInputRef.current!.value

        if(username !== 'user' || password !== '1234'){
            alert('Usuário ou senha incorretos')
        }
        
        signin({username})
    }



    return (
    <div className={styles.container}>
        <form onSubmit={handleLoginSubmit}>
            <input type="text" name="login" placeholder="Login" required className={styles.inputLogin} /><br />
            <input type="password" name="senha" placeholder="Senha" required className={styles.inputSenha} /><br />
            <Link to="/topicos">
                <input type="submit" value="Entrar" className={styles.button} />
            </Link>
        </form>
    </div>
      );
    
}