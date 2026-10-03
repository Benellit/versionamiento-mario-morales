# Inventario personal · Benellit

Personalización de la aplicación proporcionada `exampleWebApp_with_localStorage`, realizada para practicar control de versiones con Git y GitHub.

## Cambios

- Paleta verde, fondos claros y tarjetas con bordes suaves.
- Tipografía Segoe UI para la interfaz y Georgia para el título principal.
- Interfaz en español y usuario **Benellit** visible en la cabecera y el pie.
- Tarjetas con la cantidad de productos y el valor total del inventario.
- Búsqueda por nombre, mensajes de estado y diseño adaptable a teléfonos.
- Registro y eliminación de productos, manteniendo la persistencia con localStorage.
- Validación de datos y uso de texto seguro para mostrar los nombres de productos.

Los datos se guardan únicamente en el navegador y dispositivo donde se utiliza la app. El valor total suma los precios de los productos registrados; no se manejan cantidades de existencias.

## Ejecutar

Abrir `index.html` en el navegador o servir la carpeta con un servidor HTTP local. No requiere instalación de dependencias ni compilación.

## Flujo de versionamiento

La rama `main` contiene la aplicación original como punto de partida. Las modificaciones están en `feature/personalizacion-inventario`. La integración debe realizarse mediante un Pull Request en GitHub, conservando los commits individuales con la opción **Create a merge commit**.

### Commits

1. `chore: incorporar aplicación original con localStorage` (main).
2. `style: personalizar paleta, tipografías e interfaz de Benellit` (rama secundaria).
3. `feat: agregar búsqueda, resumen de inventario y validación` (rama secundaria).
4. `docs: documentar procedimiento y publicación` (rama secundaria).

La integración mediante Pull Request añadirá el quinto commit. No usar squash para conservar la evidencia de los cambios separados.

## Comprobaciones realizadas

Se verificaron en un navegador el registro de un producto, el cálculo del resumen, la persistencia al recargar, la búsqueda sin resultados, la búsqueda sin distinguir mayúsculas y minúsculas y la eliminación. También se revisó la sintaxis de JavaScript y el aspecto de la interfaz.

## Publicación en GitHub Pages

Después de integrar el Pull Request, seleccionar **Settings → Pages → Deploy from a branch → main → / (root) → Save**. El sitio utiliza rutas relativas para cargar sus estilos y funciones dentro de la ruta del repositorio.

## Enlaces

- Repositorio: https://github.com/Benellit/versionamiento-mario-morales
- Aplicación: https://benellit.github.io/versionamiento-mario-morales/

El enlace de la aplicación estará disponible después de la integración y del despliegue de GitHub Pages.

