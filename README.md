# Plataforma de Venta de Cursos/Ebooks Digitales

Proyecto de práctica full-stack para explorar un flujo completo de desarrollo: backend, frontend, base de datos, autenticación por correo, pagos y seguridad.

## Objetivo del proyecto

Este es un proyecto de **aprendizaje**, no un producto en producción. La idea es construir de punta a punta una plataforma donde los usuarios puedan:

- Crear una cuenta y verificarla por correo electrónico
- Iniciar sesión de forma segura
- Ver un catálogo de productos digitales (cursos, ebooks, plantillas, etc.)
- Comprar un producto con tarjeta (pago en modo de prueba)
- Acceder/descargar el contenido comprado desde su panel de usuario
- (Admin) Subir y gestionar productos del catálogo

## Funcionalidades

### Usuarios
- [ ] Registro de cuenta (nombre, correo, contraseña)
- [ ] Verificación de cuenta por correo (link/token de confirmación)
- [ ] Login seguro (sesión con cookies httpOnly o JWT)
- [ ] Recuperación de contraseña por correo
- [ ] Panel de usuario con historial de compras y acceso al contenido comprado

### Catálogo
- [ ] Listado de productos con detalle (nombre, descripción, precio, imagen)
- [ ] Búsqueda/filtro básico

### Pagos
- [ ] Checkout con Stripe (modo test)
- [ ] Confirmación de pago vía webhook (validado en backend, no en frontend)
- [ ] Registro de la orden/compra en base de datos tras pago confirmado

### Administración
- [ ] Panel simple para crear/editar/eliminar productos
- [ ] Ver órdenes/ventas realizadas

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React (Vite) o Next.js + Tailwind CSS |
| Backend | Node.js + Express (o NestJS) |
| Base de datos | PostgreSQL + Prisma (ORM) |
| Autenticación | bcrypt (hash de contraseñas), JWT o cookies httpOnly |
| Envío de correos | Resend o SendGrid (verificación de cuenta, recuperación de contraseña) |
| Pagos | Stripe (modo test) |
| Hosting (futuro) | Frontend en Vercel · Backend/DB en Railway o Render |

## Seguridad — requisitos mínimos

- Toda validación de pago, precios y permisos se hace en el **backend**, nunca se confía en el frontend
- Contraseñas siempre con **hash** (bcrypt), nunca texto plano
- **Rate limiting** en endpoints de login/registro para evitar fuerza bruta
- Validación de inputs en backend con **Zod** o **Joi**
- Variables sensibles (claves de Stripe, DB, JWT secret) en `.env`, nunca en el repositorio (`.gitignore`)
- **HTTPS** en todo momento
- **CORS** configurado de forma restrictiva (sin `*` en producción)
- Webhooks de Stripe verificados con su firma secreta
- Protección contra inyección SQL (mitigado por el uso de Prisma) y XSS

## Modelos de base de datos (borrador inicial)

- **User**: id, nombre, correo, contraseña (hash), correo_verificado (bool), fecha_creación
- **Product**: id, nombre, descripción, precio, archivo/contenido, imagen, fecha_creación
- **Order**: id, user_id, product_id, estado_pago, stripe_payment_id, fecha_creación

## Roadmap por fases

1. **Fase 1** — Backend base + base de datos (modelos: User, Product, Order)
2. **Fase 2** — Autenticación completa (registro, verificación por correo, login, sesión)
3. **Fase 3** — Frontend básico conectado al backend (catálogo, registro, login)
4. **Fase 4** — Integración de Stripe (checkout + webhook de confirmación)
5. **Fase 5** — Panel de usuario (mis compras) y panel de administración
6. **Fase 6** — Endurecimiento de seguridad, pulido de UI, deploy

## Notas

- Proyecto únicamente de práctica, sin fines comerciales.
- Los pagos se manejarán en modo de prueba (test mode) de Stripe, sin transacciones reales.

## Backend — cómo correrlo

Requisitos: Node.js, PostgreSQL corriendo localmente (servicio `postgresql-x64-17`, DB `cursos_ebooks`).

```bash
cd backend
npm install
npx prisma migrate dev   # aplica el schema (User, Product, Order) a la base de datos
npm run dev               # arranca el servidor con nodemon en http://localhost:4000
```

Endpoints de verificación:
- `GET /health` — confirma que el servidor está arriba
- `GET /health/db` — confirma que hay conexión con PostgreSQL

Variables de entorno en `backend/.env` (ver `backend/.env.example`): `DATABASE_URL`, `PORT`, `JWT_SECRET`, `FRONTEND_URL`.
