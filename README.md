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
- [x] Registro de cuenta (nombre, correo, contraseña)
- [x] Verificación de cuenta por correo (link/token de confirmación)
- [x] Login seguro (sesión con cookies httpOnly o JWT)
- [x] Recuperación de contraseña por correo
- [x] Panel de usuario con historial de compras y acceso al contenido comprado

### Catálogo
- [x] Listado de productos con detalle (nombre, descripción, precio, imagen)
- [ ] Búsqueda/filtro básico

### Pagos
- [x] Checkout con Stripe (modo test)
- [x] Confirmación de pago vía webhook (validado en backend, no en frontend)
- [x] Registro de la orden/compra en base de datos tras pago confirmado

### Administración
- [x] Panel simple para crear/editar/eliminar productos
- [x] Ver órdenes/ventas realizadas

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React (Vite) o Next.js + Tailwind CSS |
| Backend | Node.js + Express (o NestJS) |
| Base de datos | PostgreSQL + Prisma (ORM) |
| Autenticación | bcrypt (hash de contraseñas), JWT o cookies httpOnly |
| Envío de correos | Resend (verificación de cuenta, recuperación de contraseña) |
| Pagos | Stripe (modo test) |
| Hosting (futuro) | Frontend en Vercel · Backend/DB en Railway o Render |

## Seguridad — requisitos mínimos

- [x] Toda validación de pago, precios y permisos se hace en el **backend**, nunca se confía en el frontend
- [x] Contraseñas siempre con **hash** (bcrypt), nunca texto plano
- [x] **Rate limiting** en endpoints de login/registro/checkout para evitar fuerza bruta y abuso
- [x] Validación de inputs en backend con **Zod**
- [x] Variables sensibles (claves de Stripe, DB, JWT secret) en `.env`, nunca en el repositorio (`.gitignore`)
- [ ] **HTTPS** en todo momento (pendiente hasta el deploy — en local no aplica; el hosting elegido en la Fase 6 lo da por defecto)
- [x] **CORS** configurado de forma restrictiva (sin `*`, un solo origen permitido vía `FRONTEND_URL`)
- [x] Webhooks de Stripe verificados con su firma secreta
- [x] Protección contra inyección SQL (mitigado por el uso de Prisma) y XSS (React escapa por defecto, sin `dangerouslySetInnerHTML` en el código)
- [x] Headers de seguridad HTTP con **helmet** (oculta `X-Powered-By`, `X-Frame-Options`, `X-Content-Type-Options`, etc.)
- [x] Manejo de errores: en producción los errores 500 no filtran detalles internos al cliente (solo se loguean en el servidor)
- [x] Promoción a administrador solo por script de línea de comandos, nunca por API (evita auto-escalación de privilegios)

## Modelos de base de datos (borrador inicial)

- **User**: id, nombre, correo, contraseña (hash), correo_verificado (bool), fecha_creación
- **Product**: id, nombre, descripción, precio, archivo/contenido, imagen, fecha_creación
- **Order**: id, user_id, product_id, estado_pago, stripe_payment_id, fecha_creación

## Roadmap por fases

1. ✅ **Fase 1** — Backend base + base de datos (modelos: User, Product, Order)
2. ✅ **Fase 2** — Autenticación completa (registro, verificación por correo, login, sesión)
3. ✅ **Fase 3** — Frontend básico conectado al backend (catálogo, registro, login)
4. ✅ **Fase 4** — Integración de Stripe (checkout + webhook de confirmación)
5. ✅ **Fase 5** — Panel de usuario (mis compras) y panel de administración
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

Variables de entorno en `backend/.env` (ver `backend/.env.example`): `DATABASE_URL`, `PORT`, `JWT_SECRET`, `FRONTEND_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`.

## Correos — verificación de cuenta y recuperación de contraseña

Los correos de verificación de cuenta y recuperación de contraseña se envían de verdad con [Resend](https://resend.com). Sin verificar un dominio propio (no hace falta para este proyecto), el plan gratuito de Resend solo permite mandar correos a la casilla con la que te registraste ahí — para probar el registro o "olvidé mi contraseña", usá ese mismo correo.

## Frontend — cómo correrlo

```bash
cd frontend
npm install
npm run dev   # arranca en http://localhost:5173
```

Variables de entorno en `frontend/.env` (ver `frontend/.env.example`): `VITE_API_URL`.

## Stripe — pagos en modo test

Para que el checkout funcione en desarrollo local necesitas tener el [Stripe CLI](https://stripe.com/docs/stripe-cli) corriendo en una terminal aparte, reenviando los webhooks a tu backend local (Stripe no puede mandarle eventos directo a `localhost`):

```bash
stripe listen --forward-to localhost:4000/webhooks/stripe
```

El comando imprime un `whsec_...` — cópialo en `backend/.env` como `STRIPE_WEBHOOK_SECRET` y reinicia el backend. Mientras ese comando esté corriendo, cualquier compra de prueba (tarjeta `4242 4242 4242 4242`, cualquier fecha futura y CVC) va a confirmar el pago y marcar la orden como `PAGADO` automáticamente.

La restricted key (`STRIPE_SECRET_KEY`) necesita permisos de escritura en **Checkout Sessions** (para el backend) y en **Debugging Tools** (solo para poder correr `stripe listen` localmente).

## Panel de usuario y administración

- `/mis-compras` (requiere login): historial de compras del usuario, con link de descarga solo si la orden está `PAGADO`.
- `/admin/productos` y `/admin/ordenes` (requiere `esAdmin = true`): CRUD de productos y listado de todas las órdenes/ventas.

No existe una forma de auto-asignarse admin desde la app (por seguridad). Para convertir un usuario existente en administrador:

```bash
cd backend
npm run make-admin -- correo@ejemplo.com
```
