import random

# Generar números de cuenta según el formato especificado
def generar_numero_cuenta():
    year = random.choice([2019, 2020, 2021, 2022, 2023, 2024])
    mes = f"{random.randint(1, 12):02}"
    random_digits = f"{random.randint(0, 9)}{random.randint(0, 9)}"
    last_digit = random.randint(0, 9)
    return f"{str(year)[-1]}{mes}{random_digits}{last_digit}"

# Asignar ID de persona y otros valores de la tablaaa
def generar_alumno_registro(id_persona):
    no_cuenta = generar_numero_cuenta()
    id_carrera = 17 # Identificador de carrera
    semestre = random.randint(1, 10)  # Asignar un semestre aleatorio entre 1 y 10
    return f"INSERT INTO `Alumno`(`id_persona`, `no_cuenta`, `semestre`, `id_carrera`) VALUES ('{id_persona}', '{no_cuenta}',  '{semestre}', '{id_carrera}');"

# Generar las sentencias SQL para los IDs en el rango 689 a 1328
sentencias_sql_alumno = [generar_alumno_registro(id_persona) for id_persona in range(2975, 3375)]

# Guardar en archivo SQL (ruta completa)
output_file_path = "/home/oscar/Documentos/Semestre2024B/Sistema_Votacion/Codigos_DB/inserts_alumno_17_uaemex.sql"
with open(output_file_path, "w") as file:
    file.write("\n".join(sentencias_sql_alumno))

print(f"Archivo '{output_file_path}' generado con las sentencias SQL.")


