# Heurísticas de Nielsen — aplicadas a este sitio

Las 10 heurísticas de usabilidad de Jakob Nielsen, con una nota de cómo se
aplican (o podrían aplicarse mejor) en este landing de Natalia Rodríguez.
Sirve como checklist para revisiones de UX futuras.

## 1. Visibilidad del estado del sistema
El usuario siempre debe saber qué está pasando.
- ✅ El widget de chat (esquina inferior) da feedback inmediato de que se puede contactar.
- ✅ Los reels muestran hover/tap para indicar que son interactivos.
- ⚠️ Revisar: el formulario de contacto/presupuesto (`ContactForm.tsx`,
  `PresupuestoFormSection.tsx`) debería mostrar un estado de carga/confirmación
  claro al enviar (spinner, mensaje de éxito o error).

## 2. Correspondencia entre el sistema y el mundo real
Usar lenguaje y conceptos familiares para el usuario, no jerga técnica.
- ✅ El sitio usa lenguaje simple en español rioplatense ("Ver Reels", "Contactar").
- ✅ Las métricas (seguidores IG, TikTok) usan el mismo formato que ven en redes
  reales (`116K`, `4.8M`).

## 3. Control y libertad del usuario
Que el usuario pueda deshacer o salir fácilmente de una acción.
- ✅ El modal de reel en desktop tiene botón de cerrar (`X`) visible.
- ⚠️ Revisar: en mobile no hay modal (a propósito), pero tampoco hay forma
  de "salir" del autoplay del slider salvo scrollear — está bien para este
  caso de uso, pero confirmar que el tap-to-pause (agregado recientemente)
  sea descubrible.

## 4. Consistencia y estándares
Mismos patrones visuales e interacciones en todo el sitio.
- ✅ Paleta rosa/naranja consistente en CTAs (`Hero`, `ReelsSection`, `MarcasSection`).
- ✅ Mismo patrón de tarjeta (rounded-2xl + shadow + hover lift) en Marcas y Reels.
- ⚠️ Hay dos componentes de timeline (`TimelineSection.tsx` y
  `TimelineSection copy.tsx`) — confirmar cuál está en uso y borrar el otro
  para evitar inconsistencias futuras si alguien edita el que no corresponde.

## 5. Prevención de errores
Diseñar para que el error no pueda ocurrir, mejor que mostrar un mensaje después.
- ⚠️ Revisar validación en `ContactForm.tsx` / `PresupuestoFormSection.tsx`
  (campos requeridos, formato de email/teléfono) antes de permitir el envío.
- ✅ Los datos de reels ahora se generan con `scripts/sync-reels.mjs`, lo que
  evita el error humano de subir un video y olvidarse de declararlo (pasaba
  antes con `video-8.mp4` y `video-20.mp4`).

## 6. Reconocer antes que recordar
Minimizar la carga de memoria del usuario mostrando opciones visibles.
- ✅ La navegación es de una sola página con secciones claras (Hero → Reels →
  Marcas → Métricas → Contacto), sin necesidad de recordar rutas.
- ✅ Los botones "Ver Reels" / "Contactar" en el Hero llevan directo a la
  sección relevante.

## 7. Flexibilidad y eficiencia de uso
Atajos para usuarios expertos sin complicar la experiencia de un novato.
- ⚠️ No hay mucho margen de mejora acá dado que es un sitio de una sola
  página orientado a visitantes ocasionales — no es prioritario.

## 8. Diseño estético y minimalista
Mostrar solo la información relevante; cada elemento extra compite por atención.
- ✅ Las tarjetas de reels ocultan stats (views/likes/shares) por defecto —
  están comentadas en el código, priorizando el video en sí.
- ✅ La sección de marcas se rediseñó para que los logos no compitan entre sí
  (escala de grises por defecto, color al hover) — reduce el ruido visual
  mientras siguen siendo legibles.

## 9. Ayudar a reconocer y recuperarse de errores
Mensajes de error claros, en lenguaje humano, con solución sugerida.
- ⚠️ Pendiente: qué pasa si el formulario de contacto falla al enviar (sin
  conexión, error del servidor). Confirmar que haya un mensaje claro y no un
  fallo silencioso.

## 10. Ayuda y documentación
Aunque lo ideal es no necesitarla, debe estar disponible si hace falta.
- ✅ El widget de chat cumple ese rol como canal de ayuda directo.
- N/A para el resto: al ser un sitio simple de una página, no debería
  necesitar documentación adicional para el visitante.

---

## Resumen de pendientes detectados
1. Estado de carga/confirmación en los formularios de contacto y presupuesto.
2. Manejo de errores visibles si el envío del formulario falla.
3. Confirmar cuál `TimelineSection` está activo y eliminar el duplicado.
4. Reemplazar los logos de marca que son imágenes de 56×56px (Mercado Libre,
   Shein, Mococo Kids, Emirates Perfumes, Breaders) por versiones de mayor
   resolución cuando estén disponibles.
