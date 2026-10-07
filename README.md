# natyrodriguezok

Sitio personal de Naty Rodriguez. React + Vite + TailwindCSS.

Producción: **https://natyrodriguez.online** (Vercel, se publica solo con cada
push a `main`). También se publica en GitHub Pages:
`https://reqini.github.io/natyrodriguezok/`.

## Panel de contenido

El contenido del sitio se edita desde **`natyrodriguez.online/admin`** (en local,
`http://localhost:5173/admin`). Desde ahí se manejan reels, marcas, redes y
datos de audiencia sin tocar código.

Al apretar "Guardar y publicar", el panel guarda el cambio en este repositorio
y el sitio se reconstruye y despliega solo. Tarda 2 o 3 minutos en verse.

### Cómo entrar al panel

Hace falta un token de GitHub, que se pega una sola vez y queda guardado en ese
navegador:

1. Ir a [github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new)
2. En "Repository access", elegir solo el repo `natyrodriguezok`
3. En permisos, dar **Contents: Read and write** y **Actions: Read and write**
4. Generar el token y pegarlo en el panel

El token queda solo en el navegador donde se carga (nunca se sube al sitio).
Si se usa una compu compartida, conviene salir con el botón "Salir", que lo borra.

## Media kit en PDF

El botón **"Media kit PDF"** del panel abre `/media-kit` con lo que está en
pantalla (aunque no esté publicado). Ahí, "Descargar PDF" abre la ventana de
impresión: elegir "Guardar como PDF" y activar "Gráficos de fondo".

Tarifas, textos y métricas del mes se editan en la pestaña **Media kit** del
panel (`client/data/mediakit.json`). Seguidores, audiencia y marcas salen de
las otras pestañas, así que el PDF siempre coincide con el sitio.

## Datos del sitio

Todo el contenido vive en archivos JSON:

| Archivo | Qué guarda |
| --- | --- |
| `client/data/reels.json` | Reels: título, descripción y métricas |
| `client/data/brands.json` | Marcas que confían en mí |
| `client/data/social.json` | Usuarios y seguidores de Instagram y TikTok |
| `client/data/audience.json` | Edad, género y países de la audiencia |

### Agregar un reel

1. Copiar el `.mp4` a `client/videos/` (ej: `video-22.mp4`)
2. Correr `pnpm dev` o `pnpm run reels:sync` — se agrega solo al JSON
3. Ponerle título y descripción desde el panel

### Agregar el logo de una marca

Copiar la imagen a `client/images/` y poner esa ruta en el panel
(ej: `images/marca-sedal.png`). Mientras no haya logo, la tarjeta muestra el
nombre de la marca.

## Seguidores de Instagram automáticos

El workflow `.github/workflows/sync-instagram.yml` trae los seguidores reales
desde la API de Instagram todos los días a las 9hs y, si cambiaron, actualiza
`client/data/social.json` y republica el sitio. También se puede disparar a
mano con el botón "Actualizar ahora" del panel, en la pestaña Redes.

### Configuración (una sola vez)

Necesita dos secrets en **Settings → Secrets and variables → Actions** del repo:

- `IG_USER_ID` — id numérico de la cuenta de Instagram
- `IG_ACCESS_TOKEN` — token de larga duración de la app de Meta

Para obtenerlos:

1. La cuenta de Instagram tiene que ser **Business o Creator** y estar vinculada
   a una página de Facebook (Configuración de Instagram → Herramientas para
   empresas)
2. Crear una app en [developers.facebook.com](https://developers.facebook.com)
   y agregarle el producto **Instagram Graph API**
3. En el [Graph API Explorer](https://developers.facebook.com/tools/explorer/),
   pedir los permisos `instagram_basic` y `pages_show_list`, y generar el token
4. Convertirlo en token de larga duración (dura 60 días) y cargarlo como secret
5. El `IG_USER_ID` sale de consultar `/me/accounts` y después
   `/{page-id}?fields=instagram_business_account`

> El token de larga duración vence a los 60 días. Cuando pase, el workflow va a
> fallar y hay que generar uno nuevo y actualizar el secret.

## Desarrollo

Necesita Node 20 o superior.

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # build de producción
pnpm typecheck  # chequeo de tipos
```

## Deploy

Cada push a `main` dispara `.github/workflows/gh-pages.yml`, que buildea y
publica en la rama `gh-pages`.

### Pasar a `natyrodriguez.app` (pendiente)

`natyrodriguez.app` todavía no tiene DNS. Para usarlo con GitHub Pages, primero
cargar estos registros en el proveedor del dominio:

```
A      @     185.199.108.153
A      @     185.199.109.153
A      @     185.199.110.153
A      @     185.199.111.153
CNAME  www   reqini.github.io
```

Cuando el dominio resuelva, cambiar `public/CNAME` a `natyrodriguez.app` y en
**Settings → Pages** del repo cargarlo como dominio personalizado con "Enforce
HTTPS". No cambiar el CNAME antes: GitHub Pages redirigiría a un dominio que no
existe.
