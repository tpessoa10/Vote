export default function Formulario(){
    return(
        <div>
            <form>
                <div>
                    <input type="text" name="titulo"/>
                    <label htmlFor="titulo">Titulo</label>
                </div>
                <div>
                    <textarea name="texto" id=""></textarea>
                    <label htmlFor="texto"></label>
                </div>
                <div>
                    <input type="datetime-local" name="data"/>
                    <label htmlFor="name">Insira a data e local</label>
                </div>
                <button>Enviar</button>
            </form>
        </div>
    )
}