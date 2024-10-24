import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../theme/variables.css'
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try {
            const response = await fetch('http://172.26.51.116:3000/login', {
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
                <IonToolbar color={'oroVerde'} >
                <div className='div-estilo1'>
                    <div className="page-myimg">
                        <IonTitle className="estilo-letras" >Sistema de Votacion</IonTitle>
                    </div>
                    
                </div>
                </IonToolbar>
            </IonHeader >
            

            
            
            <IonContent >
            <div className='page-background '>
               
                    <IonCard  className="sin-bordes  ">
                        <IonCardContent >
                         <form onSubmit={handleLogin} >
                            <IonInput fill='outline' labelPlacement='floating' value={email} type='email' placeholder='ejemplo@alumno.uaemex.mx' label='Correo Escolar' onIonChange={(e) => setEmail(e.detail.value!)} ></IonInput>
                            <IonInput className='ion-margin-top' fill='outline' value={password} labelPlacement='floating' type='password' placeholder='1711890' onIonChange={(e) => setPassword(e.detail.value!)} label='Numero de Cuenta'></IonInput>
                            <IonButton fill="clear" color={'verde1'} className='ion-margin-top estilo-letras-login' expand='full' type='submit'>Login</IonButton>
                            {/* Colocar la imagen <IonButton routerLink='/register' fill="clear" color={'oro1'} className='ion-margin-top'  type='submit' expand='full'  >Create account</IonButton> */}
                        </form>
                        </IonCardContent>
                    </IonCard>
                
            </div>
           
            </IonContent >
            
               
            
            
        </IonPage>
    );
};

export default Login;