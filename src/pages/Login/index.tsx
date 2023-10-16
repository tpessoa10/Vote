import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import { useAuth } from "../../utils/Auth";
import { useRef } from "react";

interface LoginProps{
    next?: string
}

export default function Login({next = '/topicos'}:LoginProps){
    const Navigate = useNavigate()
    const {signin, isAuthenticated} = useAuth()
    
    if(isAuthenticated){
        Navigate(next)
    }

    const usernameInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)

    const handleLoginSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = usernameInputRef.current!.value
        const password = passwordInputRef.current!.value

        if(username !== 'user' || password !== '1234'){
            alert('Usuário ou senha incorretos')
            throw new Error('Login inválido')
        }


        signin({username})
    }
    


    return (
    <div className={styles.container}>
        <form onSubmit={handleLoginSubmit}>
            <input type="text" name="username" placeholder="Login"  className={styles.inputLogin} ref={usernameInputRef}/><br />
            <input type="password" name="password" placeholder="Senha"  className={styles.inputSenha} ref={passwordInputRef}/><br />
            <input type="submit" value="Entrar" className={styles.button} />
        </form>
    </div>
      );
    
}