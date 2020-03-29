import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api'

import './styles.css';
import heroesIMG from  '../../assets/heroes.png';
import logoIMG from  '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi';


export default function Logon(){
  const history = useHistory();
  const [id,setId] = useState('');
  async function handleLogin(event){
    event.preventDefault();
    try {

      const response  = await api.post('sessions',{ id });  
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');

    } catch (error) {
      alert('Algo deu errado, tente novamente!');
      console.log(error);
    }
  }

  return(
    <div className="logon-container">  
      <section className="form">
      <img src={logoIMG} alt="Be The Hero"/>
        <form onSubmit={handleLogin}>
            <h1>Faça seu Logon</h1>
            <input 
              value = {id}
              onChange={e => setId(e.target.value)}
              placeholder="Sua ID"/>
            <button type="submit" className="button">Entrar</button>
            
            <Link to="/register" className="back-link">
                <FiLogIn size={16} color="#E02042"/>
                Não tenho cadastro
            </Link>
        </form>
      </section>
      <img src={heroesIMG} alt="Heroes"></img>
    </div>  

  )

}