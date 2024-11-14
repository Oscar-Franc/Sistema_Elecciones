import { IonModal, IonImg, IonIcon, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonInput } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { alertCircleOutline } from 'ionicons/icons'; 
import '../theme/variables.css';
import candidataImage from '../../assets/img/candidata.jpeg';
import candidataImage2 from '../../assets/img/hombreCandidato.jpeg';
import candidatoImage from '../../assets/img/candidata2.jpeg';
import UaemexImage from '../../assets/img/Logo_de_la_UAEMex.svg';

const URL = '192.168.1.98';

const Index: React.FC = () => {
    const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
    const [alumnoInfo, setAlumnoInfo] = useState<any>(null); // Datos del alumno
    const [candidatos, setCandidatos] = useState<{ id_plantilla: string; candidato: string }[]>([]);
    const [otroCandidato, setOtroCandidato] = useState(''); // Para el nombre de otro candidato
    const noCuenta = localStorage.getItem('no_cuenta'); // Obtiene el número de cuenta
    const idPersona = Number(localStorage.getItem('id_persona')); // Convertir id_persona a número

    useEffect(() => {
        if (!idPersona) {
            console.warn("ID de persona no encontrado en localStorage");
        }
    }, [idPersona]);

    // Fetch para obtener los datos del alumno
    useEffect(() => {
        const fetchAlumnoData = async () => {
            try {
                const response = await fetch(`http://${URL}:8100/alumnoInfo?no_cuenta=${noCuenta}`);
                
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del alumno');
                }
                
                const data = await response.json();
                setAlumnoInfo(data.data); // Guardar los datos del alumno
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        if (noCuenta) {
            fetchAlumnoData();
        }
    }, [noCuenta]);

    // Fetch para obtener la lista de candidatos desde el servidor
    useEffect(() => {
        const fetchCandidatos = async () => {
            try {
                const response = await fetch(`http://${URL}:8100/candidatos`);
                const data = await response.json();
                // Filtrar para obtener solo los primeros tres candidatos con nombre no nulo
                const candidatosFiltrados = data.candidatos
                    .filter((candidato: any) => candidato.candidato !== null)
                    .slice(0, 3);
                setCandidatos(candidatosFiltrados);
            } catch (error) {
                console.error('Error al obtener los candidatos:', error);
            }
        };
        fetchCandidatos();
    }, []);

    // Maneja la selección de un candidato
    const handleImageClick = (candidateName: string) => {
        setSelectedCandidates(prevSelected => 
            prevSelected.includes(candidateName) 
                ? prevSelected.filter(name => name !== candidateName) // Deselecciona si ya está en la lista
                : [...prevSelected, candidateName] // Agrega si no está en la lista
        );
    };

    // Determinar tipo de usuario según el rango de id_persona
    const determinarTipoUsuario = (id_persona: number) => {
        if (id_persona >= 1 && id_persona <= 5000) {
            return 'alumno';
        } else if (id_persona >= 5001 && id_persona <= 7000) {
            return 'profesor';
        } else if (id_persona >= 7001 && id_persona <= 8000) {
            return 'administrativo';
        }
        return null; // Fuera de rango
    };

    // Enviar voto
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idPersona) {
        alert('ID de persona no encontrado. Por favor, vuelve a iniciar sesión.');
        return;
    }

    const tipo_usuario = determinarTipoUsuario(idPersona);
    if (!tipo_usuario) {
        alert('ID de persona fuera de rango para registrar el voto');
        return;
    }

    let tipo_voto;
    let id_candidato = null;

    // Determinar el tipo de voto según las condiciones
    if (selectedCandidates.length === 1 && !otroCandidato) {
        // Caso 1: Voto válido para un solo candidato
        tipo_voto = 'candidato';
        id_candidato = candidatos.find(c => c.candidato === selectedCandidates[0])?.id_plantilla;
        if (!id_candidato) {
            alert('No se pudo encontrar el candidato seleccionado');
            return;
        }
    } else if (selectedCandidates.length === 3 && otroCandidato) {
        // Caso 2: Todos los candidatos seleccionados y "otro" especificado -> Voto en "Otro"
        tipo_voto = 'otro';
        id_candidato = 4; // asignado a plantilla "Otro"
    } else if (selectedCandidates.length === 0 && otroCandidato) {
        // Caso 3: No se selecciona ningún candidato, pero se proporciona "otro" -> Voto en "Otro"
        tipo_voto = 'otro';
        id_candidato = 4; // asignado a plantilla "Otro"
    } else {
        // Caso 4: Voto nulo en cualquier otra condición
        tipo_voto = 'nulo';
        id_candidato = 5; // asignado a plantilla "Nulo"
    }

    console.log("Datos enviados:", {
    id_persona: idPersona,
    tipo_usuario,
    id_candidato,
    tipo_voto
 });


    // Enviar la información al backend
    try {
        const response = await fetch(`http://192.168.1.98:8100/registrarVoto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_persona: idPersona, tipo_usuario, id_candidato, tipo_voto }),
        });

        const data = await response.json();
        if (data.success) {
            alert('Voto registrado correctamente');
        } else {
            alert('Error al registrar el voto');
        }
    } catch (error) {
        alert('Ocurrió un error al intentar registrar el voto 2: ');
        console.error('Error al registrar el voto:', error);

    }
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
                <h3 className='sin-estilos'>Bienvenido:</h3>
                {alumnoInfo ? (
                    <p className='sin-estilos estilo-texto'>
                        Nombre: {alumnoInfo.persona_nombre}, Carrera: {alumnoInfo.carrera_nombre}, Organización: {alumnoInfo.organizacion_nombre}, idPersona:{idPersona}
                    </p>
                ) : (
                    <p className='sin-estilos estilo-texto'>Cargando información del alumno...</p>
                )}
                <p className='sin-estilos estilo-texto'>Elige a tu candidato. Esta es una prueba piloto</p>
                
                <div className='contenedor-candidatos'>
                    <form onSubmit={handleSubmit}>
                        {/* Mostrar los primeros tres candidatos con imágenes */}
                        {candidatos.map((candidato, index) => (
                            <div key={candidato.id_plantilla} className='contenedor-candidato'>
                                <div className='info-contenedor' onClick={() => handleImageClick(candidato.candidato)}>
                                    <img 
                                        src={
                                            index === 0 ? candidataImage :
                                            index === 1 ? candidataImage2 : 
                                            candidatoImage
                                        }
                                        alt="Candidata" 
                                        className={selectedCandidates.includes(candidato.candidato) ? 'selected' : ''}
                                    />
                                    {/* Mostrar tachado si el candidato está seleccionado */}
                                    {selectedCandidates.includes(candidato.candidato) && (
                                        <span className='mark'>X</span>
                                    )}
                                    <div className='fondo-info'>
                                        <p className='sin-estilos'>Nombre: {candidato.candidato}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Campo para ingresar otro candidato */}
                        <IonLabel position="floating">Escribe el nombre de algún otro candidato</IonLabel>
                        <IonInput
                            className='caja-login'
                            fill='outline'
                            labelPlacement='floating'
                            type='text'
                            placeholder='Luis Hernandez Sanchez'
                            value={otroCandidato}
                            onIonChange={(e) => setOtroCandidato(e.detail.value!)}
                        ></IonInput>
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
