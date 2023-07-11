# Prueba GBP

Este proyecto es una aplicación Node.js que se conecta a una base de datos MySQL2. A continuación se detallan los pasos para configurar y utilizar este proyecto.

## Requisitos previos

- Node.js instalado en el sistema.
- Base de datos MySQL2 configurada y en ejecución.

## Configuración del proyecto

1. Clona este repositorio o descarga los archivos del proyecto.

2. Abre una terminal y navega hasta el directorio del proyecto.

3. Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```
   bashCopy code
   npm install
   ```

4. Configura la conexión a la base de datos MySQL2 modificando el archivo `config.js` con los detalles de tu configuración.

## Migraciones de la base de datos

1. Utilizando el modelo relacional de la base de datos proporcionado, se deben crear las migraciones para las 5 tablas: bodegas, historiales, inventarios, productos y users. Asegúrate de tener la base de datos creada antes de ejecutar las migraciones.

2. Ejecuta el siguiente comando para aplicar las migraciones y crear las tablas en la base de datos:

   ```
   bashCopy code
   npm run migrate
   ```

## Importación de datos

1. Se proporciona un archivo `data.sql` que contiene datos de prueba para la base de datos.

2. Importa los datos ejecutando el siguiente comando:

   ```
   bashCopy code
   npm run import-data
   ```

## Endpoints disponibles

A continuación se describen los endpoints disponibles en esta aplicación:

### Listar bodegas ordenadas alfabéticamente

- Método: GET
- Ruta: /bodegas
- Descripción: Este endpoint devuelve la lista de todas las bodegas ordenadas alfabéticamente.
- Parámetros de entrada: Ninguno.

### Crear una nueva bodega

- Método: POST
- Ruta: /bodegas
- Descripción: Este endpoint permite crear una nueva bodega.
- Parámetros de entrada:
  - nombre (string): El nombre de la bodega.
  - ubicacion (string): La ubicación de la bodega.
  - capacidad (integer): La capacidad de la bodega en unidades.

### Listar productos en orden descendente por el campo "Total"

- Método: GET
- Ruta: /productos
- Descripción: Este endpoint devuelve la lista de todos los productos ordenados en orden descendente por el campo "Total", que representa la cantidad total de unidades que la empresa tiene de ese producto en todas las bodegas.
- Parámetros de entrada: Ninguno.

### Insertar un nuevo producto con una cantidad inicial en la tabla inventarios

- Método: POST
- Ruta: /productos
- Descripción: Este endpoint permite insertar un nuevo producto en la base de datos y asignarle una cantidad inicial en la tabla inventarios de una bodega por defecto.
- Parámetros de entrada:
  - nombre (string): El nombre del producto.
  - precio (number): El precio del producto.
  - cantidad (integer): La cantidad inicial del producto.

### Insertar registros en la tabla de inventarios

- Método: POST
- Ruta: /inventarios
- Descripción: Este endpoint permite insertar registros en la tabla de inventarios. Se debe validar si la combinación de bodega y producto ya existe en la tabla.
- Parámetros de entrada:
  - id_producto (integer): El ID del producto.
  - id_bodega (integer): El ID de la bodega.
  - cantidad (integer): La cantidad a insertar.

### Trasladar un producto de una bodega a otra

- Método: POST
- Ruta: /traslado
- Descripción: Este endpoint permite trasladar un producto de una bodega a otra. Se valida que la cantidad a trasladar sea posible y se actualizan los registros en las tablas de inventarios y historiales.
- Parámetros de entrada:
  - id_producto (integer): El ID del producto a trasladar.
  - id_bodega_origen (integer): El ID de la bodega de origen.
  - id_bodega_destino (integer): El ID de la bodega de destino.
  - cantidad (integer): La cantidad a trasladar.

¡Listo! Ahora puedes utilizar los diferentes endpoints de la aplicación para interactuar con la base de datos y realizar operaciones relacionadas con bodegas, productos e inventarios.