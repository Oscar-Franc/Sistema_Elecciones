import { IonModal, IonImg, IonIcon, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { alertCircleOutline } from 'ionicons/icons'; 
import '../theme/variables.css'
import candidataImage from '../../assets/img/candidata.jpg';
import candidataImage2 from  '../../assets/img/candidata3.jpg'
import candidatoImage from '../../assets/img/hombreCandidato.jpg'

const Index: React.FC = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'oroVerde'}>
                    <IonTitle style={{color: 'white'}}>Estas en el index vota por tu candidato</IonTitle>
                </IonToolbar>
            </IonHeader>
    
            <IonContent className="ion-padding custom-content"   >
                <div className='contenedor-candidatos'  >
                 <form >
                    
                    <div className='contenedor-candidato '>
                        <IonButton color="primary" expand="block" className='info-icon' routerLink='/infoCandidatos' ><IonIcon icon={alertCircleOutline} /></IonButton>
                        <img src={candidataImage} alt="Candidata" />
                        <IonButton fill="clear" color={'verde1'} className='ion-margin-top estilo-letras-login' expand='full' type='submit'>Candidato 1</IonButton>
                    </div>

                    <div className='contenedor-candidato ion-margin-top '>
                        <IonButton color="primary" expand="block" routerLink='/infoCandidatos' className='info-icon' ><IonIcon icon={alertCircleOutline} /></IonButton>
                        <img src={candidataImage2} alt="Candidata" />
                        <IonButton fill="clear" color={'verde1'} className='ion-margin-top estilo-letras-login' expand='full' type='submit'>Candidato 2</IonButton>
                    </div>

                    <div className='contenedor-candidato ion-margin-top '>
                        <IonButton color="primary" expand="block" routerLink='/infoCandidatos' className='info-icon' ><IonIcon icon={alertCircleOutline} /></IonButton>
                        <img src={candidatoImage} alt="Candidata" />
                        <IonButton fill="clear" color={'verde1'} className='ion-margin-top estilo-letras-login' expand='full' type='submit'>Candidato 3</IonButton>
                    </div>
                    
                 </form>
                </div>
                
            </IonContent>
        </IonPage>
    );
};

export default Index;