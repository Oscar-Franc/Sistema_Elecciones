import { IonButton, IonModal ,IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonCheckbox,IonSelect, IonSelectOption} from '@ionic/react';
import React, { useState }  from 'react';
import { useHistory } from 'react-router-dom';
import candidataImage from '../../assets/img/candidata.jpeg';
import candidataImage2 from  '../../assets/img/hombreCandidato.jpeg'
import candidatoImage from '../../assets/img/candidata2.jpeg'
import UaemexImage from '../../assets/img/Logo_de_la_UAEMex.svg';
const Register: React.FC = () => {
    
  
    return (
        <IonPage>
            <IonHeader class='none-shadow'>
                <IonToolbar color={'oroVerde4'}>
                <div className='div-estilo1 color-principal'>
                    <div className='div-logo'>
                    <img src={UaemexImage} className='img2' alt="logoUaemex" />
                    </div>
                    
                   
                
                    <IonTitle color={'oroVerde4'} className="estilo-letras2">Universidad Autonoma del <br />Estado de Mexico
                    <br />Prueba Piloto Eleccion de Rector </IonTitle>
                    
                    </div>
                </IonToolbar>
            </IonHeader>
            
            <IonContent className="ion-padding custom-content"  >
            <form >
                    
                    <div className='contenedor-candidato '>
                        
                        <div className='info-contenedor'>
                        
                        <img src={candidataImage} alt="Candidata" />
                        <div className='fondo-info'>
                            <p className='sin-estilos '  >Nombre: Maria Luisa Hernandez Sanchez</p>
                            
                        </div>
                        
                        </div>
                        
                        
                    </div>

                    <div className='contenedor-candidato '>
                        
                        <div className='info-contenedor'>
                        
                        <img src={candidataImage2} alt="Candidata" />
                        <div className='fondo-info'>
                            <p className='sin-estilos '  >Nombre: Samara FLores Alba</p>
                            
                        </div>
                        
                        </div>
                        
                    </div>

                    <div className='contenedor-candidato  '>
                        <div className='info-contenedor'> 
                        
                        <img src={candidatoImage} alt="Candidata" />
                        <div className='fondo-info'>
                            <p className='sin-estilos '  >Nombre: Victor Hugo Lopez</p>
                            
                        </div>
                        
                        </div>
                        
                    </div>
                 </form>
            <IonLabel>Selecciona un espacio académico</IonLabel>
          <IonSelect>
            <IonSelectOption value="espacio1">Espacio Académico 1</IonSelectOption>
            <IonSelectOption value="espacio2">Espacio Académico 2</IonSelectOption>
            <IonSelectOption value="espacio3">Espacio Académico 3</IonSelectOption>
          </IonSelect>
                
                        <IonButton routerLink='/login' fill="clear" color={'verde1'} className='ion-margin-top estilo-letras-login' expand='full' type='submit' >
                Siguiente
            </IonButton>
                
            </IonContent>
        </IonPage>
    );
};

export default Register;