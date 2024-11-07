import random

def generar_nombre():
    nombres = [
        "Juan", "María", "Pedro", "Ana", "Luis", "Carlos", "Sofía", "David", "Laura", "Jorge", "Mónica", "Elena",
        "Miguel", "Andrés", "Diana", "Alejandro", "Patricia", "Fernando", "Rosa", "Gabriel", "Paola", "Rodrigo",
        "Verónica", "César", "Sara", "Raúl", "Margarita", "Martín", "Elsa", "Santiago", "Daniel", "Camila", "Emilio",
        "Beatriz", "Ricardo", "Irene", "Tomás", "Julia", "Clara", "Renato", "Silvia", "Jaime", "Manuel", "Lucía",
        "Vicente", "Natalia", "Arturo", "Olga", "Ramón", "Francisco", "Teresa", "Marcos", "Cristina", "Mario", "Inés",
        "Rafael", "Virginia", "Edgar", "Lidia", "Adriana", "Jesús", "Lorena", "Roberto", "Marta", "Ángel", "Sandra",
        "Fabiola", "Leonardo", "Susana", "Edith", "Víctor", "Marcela", "Ángela", "Héctor", "Cintia", "Omar", "Brenda",
        "Esteban", "Gisela", "Mariana", "Rubén", "Gloria", "Isabel", "Samuel", "Antonia", "Lucas", "Bárbara", "Félix",
        "Nadia", "Oscar", "Rocío", "Adolfo", "Eva", "Hilda", "Anselmo", "Amalia", "Elisa", "Celeste", "Norberto", 
        "Mireya", "Emilia", "Eduardo", "Ignacio", "Pilar", "Román", "Olivo", "Consuelo", "Ágata"
    ]

    apellidos_paternos = [
        "García", "López", "Martínez", "Hernández", "González", "Pérez", "Sánchez", "Ramírez", "Torres", "Flores",
        "Castillo", "Cruz", "Rojas", "Mendoza", "Reyes", "Ortega", "Vargas", "Silva", "Morales", "Rivera", "Romero",
        "Espinoza", "Serrano", "Carrillo", "Vega", "Ortiz", "Contreras", "Domínguez", "Chávez", "Guerrero", "Ríos",
        "Valenzuela", "Suárez", "Pacheco", "Miranda", "Álvarez", "Núñez", "Soto", "Delgado", "Escobar", "Rangel", "Galván",
        "Mejía", "Valdez", "Navarro", "Jiménez", "Varela", "Correa", "Maldonado", "Ochoa", "Acosta", "Campos", "León",
        "Guzmán", "Reynoso", "Mora", "Aguilera", "Rueda", "Vázquez", "Figueroa", "Avilés", "Molina", "Maldonado",
        "Arias", "Villarreal", "Macías", "Benítez", "Peralta", "Becerra", "Peña", "Quintero", "Zamora", "Amador",
        "Noriega", "Villalobos", "Vallejo", "Tapia", "Palacios", "Bermúdez", "Montoya", "Lara", "Lemus", "Tovar",
        "Estrada", "Pineda", "Venegas", "Linares", "Murillo", "Barragán", "Cepeda", "Salas", "Camacho", "Treviño",
        "Padilla", "Segura", "Herrera", "Quezada", "Ávila", "Barrón", "Villegas", "Arce"
    ]

    apellidos_maternos = [
        "Navarro", "Jiménez", "Valdez", "Acosta", "Cabrera", "Rosales", "Salazar", "Mejía", "Guerrero", "Cortés",
        "Ramos", "Ornelas", "Herrera", "Núñez", "Benítez", "Escobar", "Soto", "Pacheco", "Muñoz", "Luna", "Peña",
        "Zavala", "Alvarado", "Martínez", "Ramírez", "González", "López", "Chávez", "Ortega", "Ríos", "Castro",
        "Rangel", "Santillán", "Gómez", "Espinoza", "Reyes", "Serrano", "Vega", "Salinas", "Vargas", "Gallegos",
        "Lara", "Miranda", "Pineda", "Montes", "Sánchez", "Vázquez", "Cárdenas", "Torres", "Flores", "Cano", "Juárez",
        "Morales", "Pérez", "Escamilla", "Guevara", "Guzmán", "Corral", "Mendoza", "Blanco", "Carranza", "Avilés",
        "Nieto", "Quintero", "Hernández", "Campos", "Ibarra", "Cardoza", "Franco", "Méndez", "Escobedo", "Licea",
        "Huerta", "Pérez", "Montalvo", "Muñiz", "Pardo", "Aguirre", "Molina", "Toribio", "Velasco", "Espinosa",
        "Rincón", "Cázares", "López", "Meléndez", "Bravo", "Lira", "Saldaña", "Barrientos", "Reyes", "Calderón",
        "Márquez", "Estrada", "Yáñez", "Ruelas", "Benítez", "Villa", "Zapata"
    ]
    
    nombre = random.choice(nombres)
    apellido_paterno = random.choice(apellidos_paternos)
    apellido_materno = random.choice(apellidos_maternos)
    return f"{nombre} {apellido_paterno} {apellido_materno}", nombre, apellido_paterno

def generar_email(nombre, apellido_paterno, dominio):
    inicial_nombre = nombre[0].lower()
    email = f"{inicial_nombre}{apellido_paterno.lower()}@{dominio}"
    return email

def generar_telefono():
    return f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}"

# Configuración de cantidades
dominios = [
    ("alumno.uaemex.mx", 5000),
    ("profesor.uaemex.mx", 2000),
    ("administrativo.uaemex.mx", 1000)
]

# Generar las sentencias SQL
sentencias_sql = []
for dominio, cantidad in dominios:
    for _ in range(cantidad):
        nombre_completo, nombre, apellido_paterno = generar_nombre()
        email = generar_email(nombre, apellido_paterno, dominio)
        telefono = generar_telefono()
        sentencia = f"INSERT INTO `Persona`(`nombre`, `email`, `tel`) VALUES ('{nombre_completo}', '{email}', '{telefono}');"
        sentencias_sql.append(sentencia)

# Guardar en archivo SQL
with open("inserts_persona_uaemex.sql", "w") as file:
    file.write("\n".join(sentencias_sql))

print("Archivo 'inserts_persona_uaemex.sql' generado con las sentencias SQL.")
