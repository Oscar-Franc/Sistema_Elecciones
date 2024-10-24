import { IonButton, IonModal ,IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Register: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Hola.. Esta es la informacion sobre tu candidato</IonTitle>
                </IonToolbar>
            </IonHeader>
            
            <IonContent className="ion-padding">
                <div>
                        <IonButton color="primary" expand="block" routerLink='/index' >Regresar</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;