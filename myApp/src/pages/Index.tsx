import { IonModal, IonImg, IonIcon, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCheckbox, IonLabel, IonInput } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { alertCircleOutline } from 'ionicons/icons'; 
import '../theme/variables.css';
import candidataImage from '../../assets/img/candidata.jpeg';
import candidataImage2 from '../../assets/img/hombreCandidato.jpeg';
import candidatoImage from '../../assets/img/candidata2.jpeg';
import UaemexImage from '../../assets/img/Logo_de_la_UAEMex.svg';

const Index: React.FC = () => {
    const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
    const [alumnoInfo, setAlumnoInfo] = useState<any>(null); // Para guardar los datos del alumno
    const noCuenta = localStorage.getItem('no_cuenta'); // Obtiene el número de cuenta de localStorage

    // Fetch data del alumno al cargar el componente
    useEffect(() => {
        const fetchAlumnoData = async () => {
            try {
                const response = await fetch(`http://192.168.237.126:3000/alumnoInfo?no_cuenta=${noCuenta}`);
                
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del alumno');
                }
                
                const data = await response.json();
                setAlumnoInfo(data.data); // Accede a la propiedad 'data' del objeto de respuesta
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        if (noCuenta) {
            fetchAlumnoData();
        }
    }, [noCuenta]);

    const handleImageClick = (candidateName: string) => {
        setSelectedCandidates(prevSelected => 
            prevSelected.includes(candidateName) 
                ? prevSelected.filter(name => name !== candidateName) // Deselecciona si ya está en la lista
                : [...prevSelected, candidateName] // Agrega si no está en la lista
        );
    };

    return (
        <IonPage>
            <IonHeader class='none-shadow'>
                <IonToolbar color={'oroVerde1'}>
                    <div className='div-estilo2 color-principal'>
                        <div className='div-logo3'>
                            <img src={UaemexImage} className='img3' alt="logoUaemex" />
                        </div>
                        <IonTitle color={'oroVerde4'} className="estilo-letras">
                            Universidad Autónoma del <br /> Estado de México
                        </IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
    
            <IonContent className="ion-padding custom-content">
                <h4 className='sin-estilos'>Bienvenido:</h4>
                {alumnoInfo ? (
                    <p className='sin-estilos estilo-texto'>
                        {alumnoInfo.persona_nombre} <br />{alumnoInfo.carrera_nombre} <br /> {alumnoInfo.organizacion_nombre}
                    </p>
                ) : (
                    <p className='sin-estilos estilo-texto'>Cargando información del alumno...</p> 
                )}
                
                <p className='sin-estilos estilo-texto'>Elige a tu candidato. Esta es una prueba piloto</p>
                
                <div className='contenedor-candidatos'>
                    <form>
                        <div className='contenedor-candidato'>
                            <div className='info-contenedor' onClick={() => handleImageClick('Maria Luisa Hernandez Sanchez')}>
                                <img 
                                    src={candidataImage} 
                                    alt="Candidata" 
                                    className={selectedCandidates.includes('Maria Luisa Hernandez Sanchez') ? 'selected' : ''}
                                />
                                {selectedCandidates.includes('Maria Luisa Hernandez Sanchez') && <span className='mark'>X</span>}
                                <div className='fondo-info'>
                                    <p className='sin-estilos'> Maria Luisa Hernandez Sanchez</p>
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
                                    <p className='sin-estilos'>Samara Flores Alba</p>
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
                                    <p className='sin-estilos'>Victor Hugo Lopez</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <IonLabel position="floating">Escribe el nombre de algún otro candidato</IonLabel>
                        <br />
                        <IonInput className='caja-login' fill='outline' labelPlacement='floating' type='text' placeholder='Luis Hernandez Sanchez' label='Otro'></IonInput>
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