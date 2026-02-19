# 🚀 TaskFlow

TaskFlow es una aplicación web de gestión de proyectos tipo Kanban
desarrollada con:

-    **Frontend:** Angular (Standalone Components + Signals)
-    **Backend:** ASP.NET Core (.NET 9)
-    **Base de datos:** MySQL
-    **Autenticación:** JWT

Permite crear tableros colaborativos, gestionar columnas y tareas, y
organizar el trabajo mediante drag & drop.

------------------------------------------------------------------------

## Funcionalidades

### Autenticación

-   Registro de usuario
-   Login con JWT
-   Protección de rutas con AuthGuard
-   Logout

### Gestión de Tableros

-   Crear tablero
-   Editar nombre
-   Eliminar tablero (solo Owner)
-   Unirse a tablero mediante código
-   Listado de tableros del usuario

### Gestión de Columnas

-   Crear columna
-   Editar nombre
-   Eliminar columna
-   Orden por posición

### Gestión de Tareas

-   Crear tarea
-   Editar tarea
-   Eliminar tarea
-   Drag & Drop entre columnas
-   Reordenación dentro de la misma columna

------------------------------------------------------------------------

## Arquitectura Frontend

Estructura principal:

    src/app/
    ├── components/
    │   ├── layout/
    │   ├── column/
    │   ├── task/
    │   └── ui/
    ├── pages/
    │   ├── auth/
    │   └── boards/
    ├── services/
    ├── guards/
    └── interceptors/

### Tecnologías usadas

-   Angular Standalone Components
-   Angular Signals
-   Angular CDK (Drag & Drop)
-   HttpInterceptor para JWT

------------------------------------------------------------------------

## Arquitectura Backend

Controladores principales:

-   `AuthController`
-   `BoardController`
-   `ColumnController`
-   `TaskController`

Entidades principales:

-   User
-   Board
-   BoardMember
-   Column
-   Task

Relaciones: - Un usuario puede pertenecer a varios tableros. - Un
tablero tiene múltiples columnas. - Una columna tiene múltiples tareas.

------------------------------------------------------------------------

## Flujo de Navegación

-   `/login`
-   `/register`
-   `/boards`
-   `/boards/:id`

Las rutas privadas están protegidas por `authGuard`.

------------------------------------------------------------------------

## Cómo ejecutar el proyecto

### Backend

1.  Configurar cadena de conexión MySQL.

2.  Ejecutar migraciones:

    ``` bash
    dotnet ef database update
    ```

3.  Ejecutar API:

    ``` bash
    dotnet run
    ```

### Frontend

1.  Instalar dependencias:

    ``` bash
    npm install
    ```

2.  Ejecutar:

    ``` bash
    ng serve
    ```

------------------------------------------------------------------------

## Próximas mejoras

-   Persistencia del orden tras drag & drop
-   Roles avanzados (Admin/Member)
-   Invitaciones por email
-   Mejoras UI/UX
-   Tests unitarios
-   Deploy en producción

------------------------------------------------------------------------

## Autor

Proyecto desarrollado por **Joel** como aplicación completa Full Stack
(Angular + .NET).

------------------------------------------------------------------------

Tambien uso cdkdrop hay que instalarlo