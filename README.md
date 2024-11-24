Para que funcione, ponga las carpetas backend y frontend en la primera carpeta que aparece al abrir la consola.<br>
La carpeta backend tiene sólo index.js y frontend tiene solo index.html. En la carpeta backend son generados automáticamente archivos HTML que son descripciones de los temas de Reddit que están en reddit.com/reddits.json. La carpeta frontend incluye sólo index.html.<br>
Descargue Nodejs. En esa misma carpeta y en la consola, instale los <i>node_modules</i>:<br>
<code>npm i express</code>, <code>npm i fs</code>, <code>npm i cors</code> y <code>npm i mysql</code><br>
CORS es para permitir al backend localhost:3000 sólo el acceso del frontend 127.0.0.1:5500 como está en backend/index.js.<br>
Leer el REST de reddit.com/reddits.json requiere una licencia. En vez de conseguirla, lo simulé reemplazándolo por localhost/reddit.json en backend/index.js. Descargué XAMPP, copié y pegué todo el JSON del original en reddit.json y lo puse en C:\xampp\htdocs. XAMPP usa MySQL y añadí la BD <i>test</i>, quedando en backend/index.js el JSON <code>{host:"localhost",user:"root",password:"",database:"test"}</code><br>
Abra la BD, después el backend y después el frontend.<br>
Para la BD, el panel de XAMPP tiene los botones <i>Start</i> (que pasa a <i>Stop</i>) y <i>Admin</i> para cada 1 de 5 opciones, en este caso, 2: Apache y MySQL.<br>
Para abrir el backend con la consola, pase a la carpeta backend y después <code>node index.js</code><br>
Programé backend y frontend en Visual Studio Code en el cual instalé la extensión <i>Live Server</i>. Abra las carpetas backend y frontend con la opción <i>Abrir con Code</i> de la lista. Para frontend/index.html, está en VS Code abajo a la derecha <i>Go Live</i> para abrir 127.0.0.1:5500 que es la página del frontend.<br>
El frontend tiene sólo una página y la BD tiene sólo una tabla: <code>CREATE TABLE IF NOT EXISTS Tema(id CHAR(255) PRIMARY KEY, titulo CHAR(255))</code>
