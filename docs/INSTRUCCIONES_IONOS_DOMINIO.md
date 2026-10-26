# Configuración DNS en IONOS para sofeindigital.es

Instrucciones paso a paso para vincular el dominio **sofeindigital.es** alojado en IONOS a la nueva plataforma en Vercel.

---

## 🎯 Objetivo
Hacer que al escribir **sofeindigital.es** o **www.sofeindigital.es** se abra automáticamente la nueva página web de SOFEIN Digital con certificado de seguridad SSL (HTTPS) activado.

---

## 📋 Pasos en el Panel de Control de IONOS

1. **Acceder a la cuenta:**  
   Entra en [ionos.es](https://www.ionos.es/) e inicia sesión con las credenciales de cliente.

2. **Ir a la gestión del dominio:**  
   En el menú principal de la izquierda, haz clic en **Dominios & SSL**.

3. **Abrir la configuración DNS:**  
   - Busca el dominio **sofeindigital.es** en la lista.
   - Haz clic sobre la rueda de engranaje (o sobre el propio dominio) y selecciona la pestaña **DNS** (o *Configuración DNS*).

4. **Configurar los 2 Registros DNS:**

### Registro 1: Dominio Principal (raíz)
> Si ya existe un registro previo de tipo `A` con host `@`, haz clic en los tres puntos a la derecha y selecciona **Modificar**. Si no existe, pulsa **Añadir registro** > tipo **A**.

- **Tipo:** `A`
- **Nombre de host / Host:** `@`
- **Apunta a / Valor:** `76.76.21.21`
- **TTL:** `1 hora` (o *Por defecto / Automático*)

### Registro 2: Subdominio WWW
> Si ya existe un registro de tipo `CNAME` con host `www`, haz clic en **Modificar**. Si no existe, pulsa **Añadir registro** > tipo **CNAME**.

- **Tipo:** `CNAME`
- **Nombre de host / Host:** `www`
- **Apunta a / Valor:** `cname.vercel-dns.com.` *(con o sin punto final según lo admita el formulario)*
- **TTL:** `1 hora` (o *Por defecto / Automático*)

5. **Guardar los cambios:**  
   Haz clic en **Guardar**.

---

## ⏱️ Tiempo de Propagación
- Los cambios suelen activarse en **15 a 30 minutos** (con un máximo habitual de 2 a 4 horas según los operadores de internet).
- Vercel emitirá automáticamente el **certificado SSL gratuito** (candado verde de navegación segura HTTPS) sin requerir ninguna acción adicional.

---

## 💡 Opción de Delegación Técnica
Si Flor prefiere no realizar estos pasos técnicos directamente, puede:
1. Facilitar un acceso temporal a su panel de IONOS.
2. O bien, invitar a nuestro email como **usuario técnico / gestor autorizado** desde la sección de usuarios de IONOS sin compartir su contraseña principal.
