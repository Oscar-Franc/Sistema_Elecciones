import random

# Generar números de cuenta según el formato especificado
def generar_numero_cuenta():
    year = random.choice([1970,1975,1974,1978,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1992,1992,1993, 2003, 2005, 2004,2006,2010,2019, 2020, 2021, 2022, 2023, 2024])
    year_invertido = str(year)[-1] + str(year)[-2] + str(year)[-3] + str(year)[-4]  # Año invertido
    random_digits = f"{random.randint(0, 9)}{random.randint(0, 9)}"
    last_digit = random.randint(0, 9)
    return f"{year_invertido}{random_digits}{last_digit}"

# Asignar ID de persona y otros valores de la tabla
def generar_alumno_registro(id_persona):
    no_cuenta = generar_numero_cuenta()
    id_carrera = 4 # Identificador de carrera
    semestre = random.randint(1, 10)  # Asignar un semestre aleatorio entre 1 y 10
    return (
        f"INSERT INTO Administrativo (id_persona, no_cuenta, id_organizacion)"
        f"VALUES ('{id_persona}', '{no_cuenta}', '{id_carrera}');"
    )

# Generar las sentencias SQL para los IDs en el rango especificado
sentencias_sql_alumno = [generar_alumno_registro(id_persona) for id_persona in range(7126, 7201)]

# Guardar en archivo SQL (ruta completa)
output_file_path = "/home/oscar/Documentos/Semestre2024B/Sistema_Votacion/Codigos_DB/inserts_adm_4_uaemex.sql"
with open(output_file_path, "w") as file:
    file.write("\n".join(sentencias_sql_alumno))

print(f"Archivo '{output_file_path}' generado con las sentencias SQL.")