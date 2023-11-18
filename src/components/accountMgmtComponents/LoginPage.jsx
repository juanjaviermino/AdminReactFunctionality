import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage (props) {

    const API = "https://straysbackend.onrender.com";
    const navigate = useNavigate(); // Initialize the history object

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {toPreLoginPage} = props;

    function verification(psw){
        if(psw===password){
            console.log("Contraseñas iguales");
            return true;
        } else{
            console.log("Contraseñas diferentes");
            return false;
        }
    }

    const handleSubmit = async (e) =>{

        e.preventDefault();

        const res = await fetch(`${API}/userbymail?criteria=email&value=${email}`);

        switch (res.status) {
            case 404:
                window.alert("No existe un usuario con ese correo, verifica los datos");
              break;
            case 200:
                const data = await res.json();
                if(verification(data.password)){
                    toPreLoginPage(true);
                    navigate('/StraysFrontREACT/'); // 
                } else{
                    window.alert("Contraseña incorrecta, intenta de nuevo");
                }
                break;
            default:
                window.alert("Hubo un problema de nuestra parte, intenta de nuevo");
        }
    };

    return(
        <div className="loginpage gradient-background">
            <div className="loginpage__message"> 
                <h2>¡Que bueno verte!</h2>
                <p>Tu apoyo es muy valioso para poder <strong>reencontrar la felicidad</strong> de nuestra comunidad. Esperamos poder ayudarte</p>
            </div>
            <div className="loginpage__form">
                <div className="form">
                    <h2>Ingresa tus credenciales</h2>
                    <form className="form__fields" onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email}
                            placeholder='E-mail'/>
                        <input 
                            type="password" 
                            onChange={e => setPassword(e.target.value)} 
                            value={password}
                            placeholder='Contraseña'/>
                        <button className="button--action">
                            Ingresar
                        </button>
                        <Link className="form__fields-link" to="/StraysFrontREACT/register">¿No tienes una cuenta? Regístrate aquí</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;