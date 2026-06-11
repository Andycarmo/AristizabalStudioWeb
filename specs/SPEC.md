# 📌 Especificación de la Aplicación Web

## Proyecto: [Aristizábal Studio]

---

## 1. 🎯 Objetivo del Proyecto

Desarrollar una aplicación web profesional para Aristizábal Studio que permita exhibir obras artísticas y piezas artesanales, gestionar productos, recibir solicitudes de clientes y administrar el contenido desde un panel privado.

La aplicación debe servir tanto como portafolio artístico como herramienta comercial para la captación y gestión de clientes.

---

## 2. 👥 Usuarios Objetivo

Visitantes
Personas interesadas en:

- Obras artísticas.
- Piezas artesanales.
- Trabajos personalizados.
- Compra de productos disponibles.

Administrador
Responsable de:

- Gestionar productos.
- Gestionar obras recientes.
- Gestionar clientes.
- Actualizar contenido.
- Revisar solicitudes recibidas.

---

## 3. 🚀 Alcance del Proyecto
### Incluye:
- Sitio Público
- Home
- About
- Recent Works
- Store
- Contact

Panel Administrativo
- Dashboard
- Gestión de Productos
- Gestión de Obras
- Gestión de Clientes
- Autenticación

Base de Datos
- Productos
- Obras
- Clientes
- Integraciones
- Supabase Database
- Supabase Storage
- Supabase Authentication
- Supabase Edge Functions

### No incluye:
- Pasarela de pagos
- Facturación electrónica
- Sistema de inventario avanzado
- Multiusuario con roles
- Marketplace

---

## 4. 🧩 Requerimientos Funcionales

|  ID   |       Descripción                  | Prioridad |
|-------|------------------------------------|-----------|
| RF-01 | Visualizar página principal        |    Alta   |
| RF-02 | Navegar entre secciones            |    Alta   |
| RF-03 | Visualizar obras recientes         |    Media  |
| RF-04 | Visualizar catálogo de productos   |    Alta   |
| RF-05 | Filtrar productos                  |    Media  |
| RF-06 | Enviar formulario de contacto      |    Alta   |
| RF-07 | Registrar clientes automáticamente |    Alta   |
| RF-08 | Acceso al panel administrativo     |    Alta   |
| RF-09 | Crear productos                    |    Alta   |
| RF-10 | Editar productos                   |    Alta   |
| RF-11 | Eliminar productos                 |    Alta   |
| RF-12 | Subir imágenes a Storage           |    Alta   |
| RF-13 | Crear obras recientes              |    Alta   |
| RF-14 | Eliminar obras recientes           |    Alta   |
| RF-15 | Visualizar clientes registrados    |    Alta   |
| RF-16 | Mostrar métricas del dashboard     |    Media  |
---

## 5. 🗄️ Modelo de Datos

Products
- id
- name
- description
- price
- category
- images
- sold
- featured
- created_at

Recent Works
- id
- title
- description
- images
- created_at

Customers
- id
- name
- email
- phone
- customer_type
- source
- last_subject
- last_message
- interactions_count
- total_purchases
- total_spent
- created_at

---

## 6. 👤 Gestión de Clientes

Customer Types
Valor	         Significado
lead	          Contacto
prospect	      Interesado
customer	      Cliente
vip	              Cliente VIP

Sources
Valor BD	      Texto UI
contact_form	  Contacto
purchase	      Compra directa

---

## 7. ⚙️ Requerimientos No Funcionales

|  ID    |       Descripción                             |
|--------|-----------------------------------------------|
| RNF-01 | Responsive Mobile First                       |
| RNF-02 | Tiempo de carga menor a 3 segundos            |
| RNF-03 | Compatible con Chrome, Edge, Firefox y Safari |
| RNF-04 | Optimización de imágenes                      |
| RNF-05 | Seguridad mediante Supabase Auth              |
| RNF-06 | Protección de rutas administrativas           |

---

## 8. 🖥️ Arquitectura Técnica

### Frontend
- React
- React Router
- TailwindCSS
- Lucide Icons
### Backend
- Supabase
### Servicios
- Database (PostgreSQL)
- Storage
- Authentication
- Edge Functions

---

## 9. 📱 Diseño y UX

### Breakpoints

- Mobile
< 640px

- Tablet
640px - 1024px

- Desktop
1024px

### Consideraciones
- Mobile First
- Navegación intuitiva
- Optimización de imágenes
- Accesibilidad básica

---

## 10. 🔒 Seguridad

### Acceso Público
- Home
- About
- Store
- Recent Works
- Contact
###  Acceso Privado
- Dashboard
- Products
- Works
- Customers
###  Protección
- Login mediante Supabase Auth
- Rutas protegidas
- Edge Functions para operaciones sensibles

---

## 11. 📦 Estructura del Proyecto

/src

/components
/layout
/ui

/pages

/public

Home
About
Store
RecentWorks
Contact

/admin

Dashboard
Products
Works
Customers
Login

/config

supabase.js

---

## 12. 📊 Dashboard

### Métricas
- Total Productos
- Productos Vendidos
- Productos Disponibles
- Total Clientes
- Leads
- Clientes
- Revenue

---

## 13. 🧪 Testing

### Funcional
- Login
- CRUD Productos
- CRUD Obras
- Formulario Contacto
- Registro Clientes
### Responsive
- Mobile
- Tablet
- Desktop

---

## 14. 🔄 Roadmap

### MVP
- Portafolio
- Catálogo
- Contacto
- Dashboard
- Gestión Clientes
- Gestión Productos
- Gestión Obras
### V2
- Pasarela de pagos
- Sistema de pedidos
- Inventario
- Analytics avanzados
- Roles de usuario

---

## 15. 📌 Decisiones Técnicas

- React para SPA.
- TailwindCSS para rapidez de desarrollo.
- Supabase como Backend-as-a-Service.
- Edge Functions para automatizaciones.
- Storage para imágenes.
- Arquitectura Mobile First.

## 16. 📚 Glosario

- Todo SVG debe tener viewBox definido
- Evitar SVG sin dimensiones
- Usar fill="currentColor" para iconos
- Evitar usar SVG como background-image si es icono UI
- Lead: Contacto inicial registrado.
- Prospect: Cliente potencial con interés demostrado.
- Customer: Cliente que realizó una compra.
- VIP: Cliente recurrente o de alto valor.
- Recent Work: Proyecto u obra destacada.
- Dashboard: Panel administrativo con métricas.
- Edge Function: Función serverless ejecutada en Supabase.