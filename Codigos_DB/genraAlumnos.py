import random

def generar_nombre():
    nombres_masculinos = [
        "Juan", "Pedro", "Luis", "Carlos", "David", "Jorge", "Miguel", "Andrés", "Alejandro", "Fernando", "Gabriel", 
        "Rodrigo", "César", "Raúl", "Martín", "Santiago", "Daniel", "Emilio", "Ricardo", "Tomás", "Renato", "Jaime", 
        "Manuel", "Vicente", "Arturo", "Ramón", "Francisco", "Marcos", "Mario", "Rafael", "Edgar", "Jesús", "Roberto", 
        "Ángel", "Leonardo", "Víctor", "Héctor", "Omar", "Esteban", "Rubén", "Samuel", "Lucas", "Félix", "Oscar", 
        "Adolfo", "Anselmo", "Norberto", "Eduardo", "Ignacio", "Román", "Olivo"
    ]
    
    nombres_femeninos = [
        "María", "Ana", "Sofía", "Laura", "Mónica", "Elena", "Diana", "Patricia", "Rosa", "Paola", "Verónica", "Sara", 
        "Margarita", "Elsa", "Camila", "Beatriz", "Irene", "Julia", "Clara", "Silvia", "Lucía", "Natalia", "Olga", 
        "Teresa", "Cristina", "Inés", "Virginia", "Lidia", "Adriana", "Lorena", "Marta", "Sandra", "Fabiola", "Susana", 
        "Edith", "Marcela", "Ángela", "Cintia", "Brenda", "Gisela", "Mariana", "Gloria", "Isabel", "Antonia", "Bárbara", 
        "Nadia", "Rocío", "Eva", "Hilda", "Amalia", "Elisa", "Celeste", "Mireya", "Emilia", "Pilar", "Consuelo", "Ágata"
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
    
    nombres = nombres_masculinos + nombres_femeninos
    nombre = random.choice(nombres)
    apellido_paterno = random.choice(apellidos_paternos)
    apellido_materno = random.choice(apellidos_maternos)
    sexo = "H" if nombre in nombres_masculinos else "M"
    return f"{nombre} {apellido_paterno} {apellido_materno}", nombre, apellido_paterno, sexo

def generar_email(nombre, apellido_paterno, dominio):
    inicial_nombre = nombre[0].lower()
    email = f"{inicial_nombre}{apellido_paterno.lower()}@{dominio}"
    return email

def generar_telefono():
    return f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}"

def generar_edad(dominio):
    if dominio == "alumno.uaemex.mx":
        return random.randint(18, 35)
    elif dominio == "profesor.uaemex.mx" or dominio == "administrativo.uaemex.mx":
        return random.randint(25, 60)

# Configuración de cantidades
dominios = [
    ("alumno.uaemex.mx", 3000),
    ("profesor.uaemex.mx", 0),
    ("administrativo.uaemex.mx", 0)
]

# Generar las sentencias SQL
sentencias_sql = []
for dominio, cantidad in dominios:
    for _ in range(cantidad):
        nombre_completo, nombre, apellido_paterno, sexo = generar_nombre()
        email = generar_email(nombre, apellido_paterno, dominio)
        telefono = generar_telefono()
        edad = generar_edad(dominio)
        sentencia = (
            f"INSERT INTO `Persona`(`nombre`, `email`, `tel`, `sexo`, `edad`) "
            f"VALUES ('{nombre_completo}', '{email}', '{telefono}', '{sexo}', {edad});"
        )
        sentencias_sql.append(sentencia)

# Guardar en archivo SQL
with open("inserts_persona_uaemex_4.sql", "w") as file:
    file.write("\n".join(sentencias_sql))

print("Archivo 'inserts_persona_uaemex.sql' generado con las sentencias SQL.")
