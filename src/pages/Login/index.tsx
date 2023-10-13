import { Link } from "react-router-dom";
import styles from './Login.module.css';

export default function Login(){
    return (
    <div className={styles.container}>
        <form>
            <input type="text" name="login" placeholder="Login" required className={styles.inputLogin} /><br />
            <input type="password" name="senha" placeholder="Senha" required className={styles.inputSenha} /><br />
            <Link to="/topicos">
                <input type="submit" value="Entrar" className={styles.button} />
            </Link>
        </form>
    </div>
      );
    
}