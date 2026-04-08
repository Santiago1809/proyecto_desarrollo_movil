# Proyecto: App de Biblioteca (Proyecto de Desarrollo Móvil)

Resumen sencillo y objetivo del proyecto:

- Esta aplicación móvil permite a los usuarios gestionar una biblioteca digital: pueden registrarse, iniciar sesión, agregar libros (incluyendo subir una imagen de portada), ver detalles de cada libro, y gestionar préstamos (prestar y devolver libros).
- El objetivo es que los estudiantes comprendan cómo se estructura una app real usando React Native y Expo, integrando servicios externos como Firebase (para autenticación y base de datos) y Cloudinary (para almacenar imágenes en la nube).
- El código está organizado para que sea fácil de entender, modificar y presentar en una sustentación grupal.

Cómo usar (rápido)

1. Clonar el repositorio.
2. Instalar dependencias: `npm install` o `yarn install`.
3. Configurar credenciales de Firebase en `firebase.js` (API keys, authDomain, etc.).
4. Ejecutar la app: `npx expo start` (o `expo start`) y usar Expo Go o un emulador.

Qué presentar en la sustentación (puntos clave)

- Explicar la arquitectura general: componentes, contextos, hooks y pantallas.
- Mostrar flujo de autenticación: registro, login y persistencia de usuario.
- Demostrar agregar un libro con imagen (subida a Cloudinary) y cómo se muestra en la lista.
- Mostrar detalles de libro y flujo de préstamo (prestar / devolver).
- Comentar decisiones técnicas: por qué usar hooks personalizados, contexto para auth, y separación de componentes.

Descripción de archivos y carpetas (función de cada uno)

Archivos raíz (explicación detallada):

- `App.js`: Es el archivo principal donde inicia la app. Aquí se configura la navegación global (por ejemplo, el Drawer o Stack Navigator) y se incluyen los providers de contexto (como el de autenticación). Si quieres agregar lógica global (como un tema de colores o un listener de red), este es el lugar.
- `app.json`: Archivo de configuración de Expo. Define el nombre de la app, el icono, la orientación de pantalla, permisos requeridos, y otros metadatos. Si cambias el nombre o el icono de la app, debes hacerlo aquí.
- `babel.config.js`: Configura Babel, que es el compilador que traduce el código moderno de JavaScript/TypeScript a una versión compatible con todos los dispositivos. Si necesitas usar librerías modernas o plugins especiales, se agregan aquí.
- `env.d.ts`: Archivo de definición de tipos para variables de entorno. Si usas TypeScript, ayuda a que el editor reconozca las variables de entorno y evites errores por nombres mal escritos.
- `firebase.js`: Aquí se inicializa y configura Firebase. Debes poner las credenciales de tu proyecto (apiKey, authDomain, etc). Este archivo exporta la instancia de Firebase para que otros archivos puedan usar autenticación, base de datos, etc. Ejemplo de uso: importar `auth` o `db` desde aquí en tus hooks.
- `index.js`: Es el punto de entrada que registra la app con React Native/Expo. Normalmente no necesitas modificarlo, salvo que quieras cambiar el nombre del componente raíz.
- `package.json`: Lista todas las dependencias (librerías) que usa el proyecto, scripts útiles (como `start`, `build`, `test`), y metadatos como el nombre y la versión. Si instalas una nueva librería, se agrega aquí automáticamente.
- `READDME.md`: Este archivo. Contiene toda la documentación del proyecto, instrucciones de uso, y guía para la sustentación. Es importante mantenerlo actualizado para que cualquier persona pueda entender y ejecutar el proyecto.

---

## Archivos generados por Expo por defecto

Cuando creas un proyecto nuevo con Expo (por ejemplo, usando `npx create-expo-app`), Expo genera automáticamente algunos archivos y carpetas básicos. Estos archivos sirven como base para cualquier aplicación Expo y normalmente no requieren modificaciones profundas, salvo que quieras personalizar la configuración. Los principales archivos generados por defecto son:

- `App.js`: Archivo principal de la app. Expo lo crea con un ejemplo básico de pantalla. Aquí es donde se empieza a construir la lógica y la interfaz de la app.
- `app.json`: Archivo de configuración global de Expo. Aquí se define el nombre, slug, icono, versión, permisos, y otros parámetros importantes para la app y para la publicación en tiendas.
- `babel.config.js`: Archivo de configuración para Babel, el compilador de JavaScript. Expo lo genera para asegurar compatibilidad con todas las versiones de React Native y para permitir el uso de sintaxis moderna.
- `package.json`: Archivo estándar de proyectos Node.js/React Native. Expo lo inicializa con dependencias mínimas y scripts útiles como `start`, `android`, `ios`, y `web`.
- `index.js`: Archivo de entrada que registra el componente principal de la app. Expo lo crea para conectar React Native con el sistema operativo.

Estos archivos forman la base del proyecto y, aunque pueden ser modificados, es recomendable mantener su estructura y solo personalizarlos cuando sea necesario (por ejemplo, para agregar nuevas dependencias, cambiar el icono, o modificar la configuración de Babel).

---

Carpeta `assets/` (recursos estáticos):

- Aquí se guardan todas las imágenes, íconos, logos y archivos que no cambian durante la ejecución de la app. Por ejemplo, el logo de la universidad, imágenes de fondo, o íconos personalizados. Si quieres agregar una imagen para usar en varios lugares, colócala aquí y accede a ella usando `require('../assets/mi-imagen.png')`.

Carpeta `components/` (componentes reutilizables y UI):

- Aquí se agrupan todos los componentes visuales que se usan en varias partes de la app. Esto ayuda a mantener el código limpio y evitar repeticiones.
  - `AppText.js`: Componente que reemplaza el `<Text>` estándar de React Native, aplicando siempre la misma fuente, tamaño y color. Así toda la app tiene una tipografía consistente. Ejemplo: en vez de usar `<Text>Hola</Text>`, usas `<AppText>Hola</AppText>`.
  - `Body.js`: Un contenedor que aplica márgenes y paddings estándar a las pantallas, asegurando que el contenido no quede pegado a los bordes y se vea ordenado.
  - `BookItem.js`: Renderiza la información de un libro en la lista principal. Muestra la imagen de portada, el título, el autor y botones de acción (ver detalles, prestar, etc). Se usa en la pantalla principal y en resultados de búsqueda.
  - `BookSkeleton.js`: Muestra un "esqueleto" o animación de carga mientras se obtienen los libros desde la base de datos. Mejora la experiencia del usuario al indicar que los datos están cargando.
  - `Card.js`: Componente de tarjeta visual, usado para agrupar información (por ejemplo, los datos de un libro o usuario) con bordes redondeados y sombra.
  - `colors.js`: Archivo donde se definen todos los colores usados en la app. Si quieres cambiar el color principal, solo lo cambias aquí y se actualiza en toda la app.
  - `EmptyState.js`: Se muestra cuando no hay datos para mostrar (por ejemplo, si no hay libros o préstamos). Incluye un mensaje y, opcionalmente, una imagen.
  - `GradientButton.js`: Botón estilizado con gradiente de colores, usado para acciones importantes como "Agregar libro" o "Guardar".
  - `Heading.js`: Encabezados de sección o pantalla, con estilos consistentes para títulos.
  - `HomeHeader.js`: Header personalizado para la pantalla principal, puede incluir el nombre del usuario, iconos de menú, etc.
  - `index.js`: Archivo que exporta todos los componentes de la carpeta, permitiendo importarlos fácilmente desde otros archivos.
  - `LoanButton.js`: Botón especializado para prestar o devolver libros, con lógica y estilos propios.
  - `MenuModal.js`: Modal que muestra un menú de opciones adicionales (por ejemplo, editar o eliminar libro).
  - `PrimaryButton.js`: Botón principal de la app, usado para acciones estándar (diferente del de gradiente).
  - Carpeta `home/`: Agrupa componentes específicos de la pantalla principal o de inicio.
    - `book-form.js`: Formulario completo para crear o editar un libro. Incluye campos de texto, selector de imagen (usando la cámara o galería), validaciones y lógica para subir la imagen a Cloudinary.

Carpeta `contexts/` (manejo de estado global):

- Aquí se colocan los contextos de React, que permiten compartir información entre muchos componentes sin tener que pasar props manualmente.
  - `AuthContext.js`: Define y provee el contexto de autenticación. Permite saber si un usuario está logueado, acceder a su información (email, nombre, etc), y ejecutar acciones como login, logout y registro. Es fundamental para proteger rutas: por ejemplo, si un usuario no está autenticado, no puede acceder a ciertas pantallas. También se encarga de mantener la sesión activa aunque se cierre y abra la app.

Carpeta `hooks/` (lógica reutilizable y conexión con servicios externos):

- Los hooks personalizados encapsulan lógica compleja y la hacen fácil de reutilizar en cualquier componente.
  - `useAuthActions.js`: Proporciona funciones para registrar usuarios, iniciar sesión, cerrar sesión y recuperar el usuario actual. Internamente usa `AuthContext` y Firebase Auth. Ejemplo: en la pantalla de login, llamas a `login(email, password)` desde este hook.
  - `useBooks.js`: Maneja toda la lógica para obtener la lista de libros, agregar nuevos, editar o eliminar. Se conecta con la base de datos (Firebase Firestore o similar) y mantiene el estado sincronizado. También puede manejar paginación y búsqueda.
  - `useCloudinary.js`: Permite subir imágenes a Cloudinary y obtener la URL para guardarla junto con el libro. Maneja la autenticación con Cloudinary y el formateo de la imagen. Ejemplo: cuando el usuario selecciona una foto, este hook la sube y devuelve la URL lista para guardar.
  - `useLoans.js`: Encapsula la lógica de préstamos: crear un nuevo préstamo, finalizarlo (devolver libro), y listar los préstamos activos o históricos. Se conecta con la base de datos y actualiza el estado global si es necesario.

Carpeta `navigation/` (navegación y rutas):

- Aquí se configura cómo el usuario navega entre las diferentes pantallas de la app.
  - `DrawerNavigator.js`: Define el menú lateral (drawer), las rutas principales (Home, Agregar libro, Perfil, etc), y cómo se muestran. Permite que el usuario acceda rápidamente a las secciones más importantes desde cualquier pantalla. Aquí también se pueden proteger rutas para que solo usuarios autenticados accedan a ciertas pantallas.

Carpeta `screens/` (pantallas principales de la app):

- Cada archivo representa una pantalla completa que el usuario puede ver y con la que puede interactuar.
  - `AddBook.js`: Pantalla donde el usuario puede agregar un nuevo libro. Incluye un formulario con campos para título, autor, descripción y la opción de subir una imagen. Usa el hook `useCloudinary` para manejar la subida de la imagen y `useBooks` para guardar el libro en la base de datos.
  - `Details.js`: Muestra toda la información de un libro seleccionado: portada, título, autor, descripción, estado (disponible/prestado), y botones para prestar, devolver, editar o eliminar (según permisos del usuario). También puede mostrar el historial de préstamos.
  - `Home.js`: Es la pantalla principal que ve el usuario al iniciar sesión. Lista todos los libros disponibles, permite buscar, filtrar y acceder a los detalles de cada libro. Usa `BookItem` para mostrar cada libro y puede mostrar un `BookSkeleton` mientras carga.
  - `Login.js`: Pantalla para que el usuario ingrese su email y contraseña y acceda a la app. Usa el hook `useAuthActions` para manejar el login y muestra mensajes de error si las credenciales son incorrectas.
  - `Register.js`: Pantalla para crear una nueva cuenta. Solicita datos como nombre, email y contraseña, y usa `useAuthActions` para registrar el usuario en Firebase Auth. Puede incluir validaciones de campos y mensajes de éxito/error.

Notas técnicas importantes para la presentación

- **Autenticación:** Explicar que toda la lógica de login, registro y persistencia de sesión está centralizada en `AuthContext` y los hooks relacionados. Esto permite que cualquier pantalla pueda saber si el usuario está autenticado y acceder a sus datos. Ejemplo: si el usuario no está logueado, se le redirige automáticamente a la pantalla de login.
- **Subida de imágenes:** Mostrar cómo el hook `useCloudinary` toma una imagen seleccionada por el usuario, la sube a la nube y devuelve una URL segura. Es importante mencionar que las claves privadas nunca deben estar en el código público y que se pueden usar variables de entorno para mayor seguridad.
- **Estado y sincronización:** Explicar que los hooks como `useBooks` y `useLoans` se encargan de obtener y actualizar los datos en tiempo real desde Firebase (o el backend que uses). Si un libro se agrega o se presta, la lista se actualiza automáticamente para todos los usuarios.
- **Componentes:** Resaltar que los componentes en `components/` permiten mantener la interfaz consistente y facilitan la reutilización. Por ejemplo, todos los botones principales usan el mismo estilo y lógica.
- **Navegación:** Explicar que el `DrawerNavigator` permite moverse entre pantallas de forma intuitiva y que se pueden proteger rutas para que solo usuarios autenticados accedan a ciertas funciones (como agregar libros o ver préstamos).

Consejos para las 3 personas en la defensa (cómo repartirse la presentación)

- **Persona 1 — Arquitectura y navegación:**
  - Explica la estructura de carpetas y archivos, por qué se separan componentes, hooks, contextos y pantallas.
  - Muestra el flujo de navegación: cómo el usuario pasa de la pantalla de login a la principal, cómo funciona el menú lateral (`DrawerNavigator`), y cómo se protegen rutas.
  - Ejemplo de frase: "Toda la navegación principal está definida en `DrawerNavigator.js`, lo que permite que el usuario acceda rápidamente a cualquier sección desde el menú lateral."
- **Persona 2 — Autenticación y datos:**
  - Explica cómo funciona el login y registro usando Firebase Auth, y cómo se mantiene la sesión activa con `AuthContext`.
  - Muestra cómo se guardan y recuperan libros y préstamos usando los hooks personalizados y la base de datos.
  - Ejemplo de frase: "Cuando un usuario se registra, sus datos se guardan en Firebase Auth y luego podemos acceder a ellos desde cualquier pantalla gracias al contexto de autenticación."
- **Persona 3 — UI y demo:**
  - Abre la app y muestra la pantalla principal (`Home.js`), cómo se agregan libros (`AddBook.js`), y cómo se visualizan los detalles y préstamos (`Details.js`).
  - Realiza una demo en vivo: agrega un libro, sube una imagen, presta un libro y muestra cómo cambia el estado en tiempo real.
  - Ejemplo de frase: "Al agregar un libro, selecciono una imagen que se sube automáticamente a Cloudinary y luego se muestra en la lista principal con el resto de la información."

Checklist rápido antes de la presentación

- Verificar que `firebase.js` tenga las credenciales correctas y que no se expongan claves privadas en la demo pública.
- Tener imágenes de prueba listas en la carpeta `assets/` o usar la cámara del dispositivo desde Expo Go para probar la subida de imágenes.
- Probar que la app corre correctamente con `npx expo start` y que cada integrante del grupo sabe qué pantalla mostrar y en qué orden durante la defensa.
- Revisar que todos los hooks y contextos funcionen correctamente y que los datos se actualicen en tiempo real.
