import { IonModal, IonImg, IonIcon, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCheckbox,IonLabel, IonInput   } from '@ionic/react';
import React, { useState } from 'react';
import { alertCircleOutline } from 'ionicons/icons'; 
import '../theme/variables.css'
import candidataImage from '../../assets/img/candidata.jpg';
import candidataImage2 from  '../../assets/img/candidata3.jpg'
import candidatoImage from '../../assets/img/hombreCandidato.jpg'
import UaemexImage from '../../assets/img/Logo_de_la_UAEMex.svg';



const Index: React.FC = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 
    }
    return (
        <IonPage >
             <IonHeader class='none-shadow'>
                <IonToolbar color={'oroVerde1'} >
                <div className='div-estilo2 color-principal'>
                    <div className='div-logo3'>
                    <img src={UaemexImage} className='img3' alt="logoUaemex" />
                    </div>
                    
                    <IonTitle color={'oroVerde4'} className="estilo-letras" >Universidad Autonoma del <br /> Estado de Mexico</IonTitle>
                </div>
                
            
                </IonToolbar>
            </IonHeader >
    
            <IonContent className="ion-padding custom-content"    >
                <h3 className='sin-estilos '>Bienvenido:</h3>
                <p  className='sin-estilos estilo-texto'>Elige a tu candidato. Esta es una prueba piloto</p>
                <div className='contenedor-candidatos'  >
                 <form >
                    
                    <div className='contenedor-candidato '>
                        
                        <div className='info-contenedor'>
                        <IonCheckbox/>
                        <img src={candidataImage} alt="Candidata" />
                        <div className='fondo-info'>
                            <p className='sin-estilos '  >Nombre: Maria Luisa Hernandez Sanchez</p>
                            <p className='sin-estilos '>Edad:  40 años</p>
                            <p className='sin-estilos '>Tiempo en la universidad: 25 años</p>
                            <p className='sin-estilos '>Grado Academico: Maestria</p>
                        </div>
                        
                        </div>
                        
                        
                    </div>

                    <div className='contenedor-candidato '>
                        
                        <div className='info-contenedor'>
                        <IonCheckbox/>
                        <img src={candidataImage2} alt="Candidata" />
                        <div className='fondo-info'>
                            <p className='sin-estilos '  >Nombre: Samara FLores Alba</p>
                            <p className='sin-estilos '>Edad: 50 años</p>
                            <p className='sin-estilos '>Tiempo en la universidad: 28 años</p>
                            <p className='sin-estilos '>Grado Academico: Doctorado</p>
                        </div>
                        
                        </div>
                        
                    </div>

                    <div className='contenedor-candidato  '>
                        <div className='info-contenedor'> 
                        <IonCheckbox/>
                        <img src={candidatoImage} alt="Candidata" />
                        <div className='fondo-info'>
                            <p className='sin-estilos '  >Nombre: Victor Hugo Lopez</p>
                            <p className='sin-estilos '>Edad: 55 años</p>
                            <p className='sin-estilos '>Tiempo en la universidad: 30 años</p>
                            <p className='sin-estilos '>Grado Academico: Doctorado</p>
                        </div>
                        
                        </div>
                        
                    </div>
                    <br />
                    <IonLabel position="floating">Escribe el nombre de algun otro candidato</IonLabel>
                    <br />
                    <IonInput className='caja-login' fill='outline' labelPlacement='floating' type='text' placeholder='Luis Hernadez Sanchez' label='Otro'  ></IonInput>
                     <div>
                     <IonButton fill="clear" color={'verde1'} className=' estilo-letras-login' expand='full' type='submit'>Votar</IonButton>
                     </div>
                    <div>
                    <IonButton fill="clear" color={'verde1'} className='ion-margin-top estilo-letras-login' expand='full' type='submit'>Anular Voto</IonButton>
                    </div>
                 </form>
                </div>
                
            </IonContent>
        </IonPage>
    );
};

export default Index;