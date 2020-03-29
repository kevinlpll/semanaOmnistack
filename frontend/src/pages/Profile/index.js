import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import './style.css'
import { Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

import { FiPower, FiTrash2 } from 'react-icons/fi';
export default function Profile(){

    const history = useHistory();
    
    const [incidents,setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`,
            {
                headers: {
                    Authorization: ongId
            }});
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            console.log(error);
            
            alert('Ocorreu erro ao deletar, tente novamente');
        }        
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    useEffect(()=>{
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        });
    },[ongId])
    
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                    <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower onClick = {handleLogout} size={18} color="#e02041"/>
                </button>
            </header>


            <h1>Casos cadastrados</h1>

            <ul>

                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>{incident.title}</strong>
                        <p>{incident.description}</p>
                        <strong>Valor: </strong>
                        <p> {Intl.NumberFormat('pt-BR', {style: 'currency',currency:'BRL'}).format(incident.value)}</p>
                        
                        <button type="button" >
                            <FiTrash2 onClick={() => handleDeleteIncident(incident.id)} size={20} color="#a8a8b3"/>
                        </button>
                </li>  
                ))}
            </ul>
        </div>
    );
}