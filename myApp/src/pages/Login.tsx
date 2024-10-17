import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../theme/variables.css'
import myImage from '../../../myApp/assets/img/Logo_de_la_UAEMex.svg';
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try {
            const response = await fetch('http://172.26.55.146:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                // Manejar errores de red o del servidor
                throw new Error('Error al iniciar sesión');
            }
            const data = await response.json();

            if (data.success) {
                console.log('Login exitoso');
                history.push('/index');
            } else {
                console.log('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error en el login:', error);
        }
    };

    return (
        <IonPage   >
            <IonHeader >
                <IonToolbar color={'oroVerde'}>
                <div style={{ textAlign: 'center', display: 'flex', width:'30px'}}>
                <img src={myImage} alt="Descripción de la imagen" style={{ width: '100px', maxWidth: '100px' }} />
                    <IonTitle >Sistema de Votacion</IonTitle>
                </div>
                </IonToolbar>
            </IonHeader >
            

            
            <IonContent >
            <div className="page-background">
                <IonCard>
                    <IonCardContent className='page-sin-margen' >
                        <form onSubmit={handleLogin}>
                            <IonInput fill='outline' labelPlacement='floating' value={email} type='email' placeholder='ejemplo@alumno.uaemex.mx' label='Correo Escolar' onIonChange={(e) => setEmail(e.detail.value!)} ></IonInput>
                            <IonInput className='ion-margin-top' fill='outline' value={password} labelPlacement='floating' type='password' placeholder='1711890' onIonChange={(e) => setPassword(e.detail.value!)} label='Numero de Cuenta'></IonInput>
                            <IonButton fill="clear" color={'verde1'} className='ion-margin-top' expand='full' type='submit'>Logiin</IonButton>
                        {/* Colocar la imagen <IonButton routerLink='/register' fill="clear" color={'oro1'} className='ion-margin-top'  type='submit' expand='full'  >Create account</IonButton> */}
                        </form>
                    </IonCardContent>
                </IonCard>
            </div>
            </IonContent>
            
               
            
            
        </IonPage>
    );
};

export default Login;