import { IonModal, IonImg, IonIcon, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCheckbox,IonLabel, IonInput   } from '@ionic/react';
import React, { useState } from 'react';
import { alertCircleOutline } from 'ionicons/icons'; 
import '../theme/variables.css'
import candidataImage from '../../assets/img/candidata.jpeg';
import candidataImage2 from  '../../assets/img/hombreCandidato.jpeg'
import candidatoImage from '../../assets/img/candidata2.jpeg'
import UaemexImage from '../../assets/img/Logo_de_la_UAEMex.svg';



const Index: React.FC = () => {
    
    const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

    const handleImageClick = (candidateName: string) => {
        setSelectedCandidates(prevSelected => 
            prevSelected.includes(candidateName) 
                ? prevSelected.filter(name => name !== candidateName) // Deselecciona si ya está en la lista
                : [...prevSelected, candidateName] // Agrega si no está en la lista
        );
    };
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
                    
                 <div className='contenedor-candidato'>
                            <div className='info-contenedor' onClick={() => handleImageClick('Maria Luisa Hernandez Sanchez')}>
                                <img 
                                    src={candidataImage} 
                                    alt="Candidata" 
                                    className={selectedCandidates.includes('Maria Luisa Hernandez Sanchez') ? 'selected' : ''}
                                />
                                {selectedCandidates.includes('Maria Luisa Hernandez Sanchez') && <span className='mark'>X</span>}
                                <div className='fondo-info'>
                                    <p className='sin-estilos'>Nombre: Maria Luisa Hernandez Sanchez</p>
                                </div>
                            </div>
                        </div>
                        <div className='contenedor-candidato'>
                            <div className='info-contenedor' onClick={() => handleImageClick('Samara Flores Alba')}>
                                <img 
                                    src={candidataImage2} 
                                    alt="Candidata" 
                                    className={selectedCandidates.includes('Samara Flores Alba') ? 'selected' : ''}
                                />
                                {selectedCandidates.includes('Samara Flores Alba') && <span className='mark'>X</span>}
                                <div className='fondo-info'>
                                    <p className='sin-estilos'>Nombre: Samara Flores Alba</p>
                                </div>
                            </div>
                        </div>

                        <div className='contenedor-candidato'>
                            <div className='info-contenedor' onClick={() => handleImageClick('Victor Hugo Lopez')}>
                                <img 
                                    src={candidatoImage} 
                                    alt="Candidato" 
                                    className={selectedCandidates.includes('Victor Hugo Lopez') ? 'selected' : ''}
                                />
                                {selectedCandidates.includes('Victor Hugo Lopez') && <span className='mark'>X</span>}
                                <div className='fondo-info'>
                                    <p className='sin-estilos'>Nombre: Victor Hugo Lopez</p>
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
                    
                 </form>
                </div>
                
            </IonContent>
        </IonPage>
    );
};

export default Index;