import React, {useEffect}from 'react';
import {Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavbarStrays (props) {

    const isLogged = useSelector(state => state.user.isLogged);

    return(
        <nav className={`${isLogged ? 'navbar--logged' : 'navbar'}`}> 
            <Link className="fs--logo" to="/StraysFrontREACT/">STRAYS</Link>
            {isLogged 
                ? 
                <ul className="navbar__items">
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/provincias">Provincias</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/ciudades">Ciudades</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/especies">Especies</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/razas">Razas</Link>
                    {/* <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/products">Productos</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/sales">Ventas</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/salessummary">Resumen</Link> */}
                </ul>
                : 
                <ul className="navbar__items">
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/register">Registrarse</Link>
                    <Link className="navbar__item fs--navitem" to="/StraysFrontREACT/login">Ingresar</Link>
                </ul>
            }
        </nav>
    );
}

export default NavbarStrays;
