# 📌 Especificación de la Aplicación Web

## Proyecto: [Aristizábal Studio]

---

## 1. 🎯 Objetivo del Proyecto

Crear una aplicación web para mostrar portafolio de servicios de obras artisticas, y piezas artesanales, optimizada para dispositivos móviles.

---

## 2. 👥 Usuarios Objetivo

- Usuario principal:
- Necesidades:
- Problemas que resuelve la app:

---

## 3. 🚀 Alcance del Proyecto
### Incluye:
- Mostras Obras Artisticas
- Piezas Artesanales

### No incluye:
- Funcionalidad fuera de MVP
- Integraciones futuras

---

## 4. 🧩 Requerimientos Funcionales

| ID | Descripción | Prioridad |
|----|------------|----------|
| RF-01 | El usuario puede ver la página principal | Alta |
| RF-02 | El usuario puede navegar entre secciones | Alta |
| RF-03 | Formulario de contacto funcional | Media |

---

## 5. ⚙️ Requerimientos No Funcionales

| ID | Descripción |
|----|------------|
| RNF-01 | Responsive en móviles (iOS y Android) |
| RNF-02 | Tiempo de carga < 3s |
| RNF-03 | Compatible con navegadores modernos |

---

## 6. 🖥️ Arquitectura Técnica

### Frontend
- Framework: React
- Styling: TailwindCSS
- Routing: React Router

### Backend (si aplica)
- Node.js / Express

### Deploy
- Vercel 

---

## 7. 📱 Diseño y UX

### Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Consideraciones:
- Evitar problemas con Safari (iOS)
- Evitar `vh` problemático → usar `dvh` o soluciones dinámas

---

## 8. 🧪 Casos de Uso

### Caso 1: Usuario visita la página
1. Entra a la web
2. Visualiza el Hero
3. Navega por secciones

### Caso 2: Usuario envía formulario
1. Llena datos
2. Hace clic en enviar
3. Recibe confirmación

---

## 9. 🔍 Criterios de Aceptación

- El Hero debe ocupar toda la pantalla en desktop
- No debe romperse en iPhone Safari
- El menú debe ser responsive

---

## 10. 🧪 Testing

### Tipos:
- Unit Testing
- E2E Testing (Playwright)

### Casos:
- Verificar carga de página
- Verificar navegación
- Verificar responsive

---

## 11. 📦 Estructura del Proyecto
/src  
/components  
/pages  
/assets  
/styles

---

## 12. ⚠️ Riesgos Técnicos

- Problemas con Safari (viewport)
- Performance en móviles
- Compatibilidad CSS

---

## 13. 🔄 Roadmap

### MVP
- Landing funcional
- Responsive completo

### V2
- Backend
- Autenticación

---

## 14. 📌 Decisiones Técnicas

- Uso de Tailwind por rapidez
- Uso de React por modularidad

---

## 15. 📚 Glosario

- Hero: Sección principal visible al cargar
- Responsive: Adaptable a dispositivos

## SVG en la aplicación

- Todo SVG debe tener viewBox definido
- Evitar SVG sin dimensiones
- Usar fill="currentColor" para iconos
- Evitar usar SVG como background-image si es icono UI