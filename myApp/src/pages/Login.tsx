import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../theme/variables.css'
import UaemexImage from '../../assets/img/Logo_de_la_UAEMex.svg';


const Login: React.FC = () => {
    
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try {
            const response = await fetch('http://192.168.237.126:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({password}),
            });
            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }
            const data = await response.json();

        if (data.success) {
            // Guardar el número de cuenta en localStorage
            localStorage.setItem('no_cuenta', password);
            
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
            <IonHeader class='none-shadow'>
                <IonToolbar color={'oroVerde'} >
                <div className='div-estilo1 color-principal'>
                    <div className='div-logo'>
                    <img src={UaemexImage} className='img2' alt="logoUaemex" />
                    </div>
                    
                    <IonTitle color={'oroVerde'} className="estilo-letras" >Universidad Autonoma del <br />Estado de Mexico <br /> Facultad de Ingenieria</IonTitle>
                </div>
                
            
                </IonToolbar>
            </IonHeader >
            

            
            
            <IonContent >
            
            <div className='page-background '>
                <h1 className='sin-bordes estilo-titulo'>Prueba de Urna
                 Electronica Electoral  </h1>
                    <IonCard  className="sin-bordes  ">
                        <IonCardContent >
                         <form onSubmit={handleLogin} >
                            
                            <IonInput className='caja-login ion-margin-top' fill='outline' value={password} labelPlacement='floating' type='text' placeholder='1711890' onIonChange={(e) => setPassword(e.detail.value!)} label='Numero de Cuenta'></IonInput>
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