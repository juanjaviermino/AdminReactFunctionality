import React, {useState, useRef, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsers } from '../../services/useUsers';
import { useCiudades } from '../../services/useCiudades';
import { Toast } from 'primereact/toast';

function RegistrationPage () {

    const toast = useRef(null);
    const navigate = useNavigate(); // Initialize the history object
    const [object, setObject] = useState({role: 'user'});
    const { createObject } = useUsers(); //EDITABLE
    const { ciudades } = useCiudades(); //EDITABLE
    const [selectedCiudadId, setSelectedCiudadId] = useState('9999');

    useEffect(()=>{
        setObject({ ...object, ['ciudad_id']: selectedCiudadId }); // EDITABLE
    }, [selectedCiudadId]);

    useEffect(()=>{
        console.log(object);
    }, [object]);

    const resetStates = () => {
        setObject({});
        setIsEditing(false);
        setSelectedId(null);
        setSelectedCiudadId('9999');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setObject({ ...object, [name]: value }); // EDITABLE
    };


    const handleCreate = async (e) =>{
        e.preventDefault();
        // Intentar el request usando el servicio
        try {
            const response = await createObject(object);
            if (response === 201) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Se añadió el registro con éxito',
                    life: 3000,
                });
                resetStates();
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error',
                life: 3000,
            });
        }
    };


    return(
        <div className="loginpage gradient-background">
            <Toast ref={toast} />
            <div className="loginpage__message"> 
                <h2>Gracias por ayudar</h2>
                <p>Nos encanta que formes parte de esta iniciativa, regístrate aquí:</p>
            </div>
            <div className="loginpage__form">
                <div className="form">
                    <h2>Ingresa tus datos</h2>
                    <form className="form__fields">
                        <label htmlFor='nombre'>Nombre <span>*</span></label>
                        <input 
                            id="nombre"
                            type="text" 
                            onChange={handleInputChange} 
                            name="name"
                            value={object?.name || ''}
                            placeholder='Nombre'
                            required
                            maxLength="20"/>
                        <label htmlFor='apellido'>Apellido <span>*</span></label>
                        <input 
                            id="apellido"
                            type="text" 
                            onChange={handleInputChange} 
                            name="lastname"
                            value={object?.lastname || ''}
                            placeholder='Apellido'
                            required
                            maxLength="20"/>
                        <label htmlFor='mail'>Email <span>*</span></label>
                        <input 
                            id="mail"
                            type="email" 
                            onChange={handleInputChange} 
                            name="email"
                            value={object?.email || ''}
                            placeholder='Email'
                            required
                            maxLength="30"/>
                        <label htmlFor='nombre'>Contraseña <span>*</span></label>
                        <input 
                            id="mail"
                            type="password" 
                            onChange={handleInputChange} 
                            name="password"
                            value={object?.password || ''}
                            placeholder='Contraseña'
                            required
                            maxLength="20"/>
                        <label htmlFor='cellphone'>Teléfono <span>*</span></label>
                        <input 
                            id="cellphone"
                            type="number" 
                            onChange={handleInputChange} 
                            name="cellphone"
                            value={object?.cellphone || ''}
                            placeholder='Teléfono'
                            required
                            maxLength="20"/>
                        <label htmlFor="ciudad">Ciudad <span>*</span></label>
                        <select
                                id="ciudad"
                                className="dropdown"
                                value={selectedCiudadId}
                                onChange={e => setSelectedCiudadId(e.target.value)}>
                                <option value="9999">Selecciona una opción</option>
                                {ciudades?.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.nombre}
                                </option>
                                ))}
                        </select>

                        <button onClick={handleCreate} className="button--action">
                            Registrarse
                        </button>
                        <Link className="form__fields-link" to="/StraysFrontREACT/login">¿Ya tienes una cuenta? Ingresa aquí</Link>
                    </form>
                </div>
            </div>    
        </div>
    );
}

export default RegistrationPage;