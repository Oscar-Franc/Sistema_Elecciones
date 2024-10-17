import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Index: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Estas en el index vota por tu candidato</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                ELigue tu candidato 
            </IonContent>
        </IonPage>
    );
};

export default Index;