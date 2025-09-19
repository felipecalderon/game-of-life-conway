# El Juego de la Vida de Conway

> "A partir de la complejidad más simple, puede emerger una complejidad de un orden completamente nuevo."
> — John H. Conway

**[Ver la simulación en vivo](https://felipecalderon.github.io/game-of-life-conway)**

---

![Visualización de la simulación](https://felipecalderon.github.io/game-of-life-conway/gif-readme.gif)

## Un Universo en una Caja

El **Juego de la Vida**, concebido por el matemático John Horton Conway en 1970, no es un juego en el sentido convencional. Es un **autómata celular**, un universo digital discreto donde, a partir de un conjunto de reglas deterministas de asombrosa simplicidad, florece una complejidad emergente que evoca los patrones del mundo natural.

Este proyecto es una implementación moderna y altamente optimizada de ese universo. No es solo una visualización, sino un laboratorio digital para observar cómo la vida, en su forma más abstracta, puede nacer, evolucionar y perecer en un lienzo de píxeles.

## Características del Ecosistema Digital

Esta simulación fue diseñada para ser tanto un espectáculo visual inmersivo como una proeza de ingeniería de software.

- **Universo Infinito y Toroidal**: La grilla se conecta sobre sí misma en los bordes, creando un espacio continuo donde los patrones pueden viajar sin fin, simulando un universo sin fronteras.

- **Renderizado de Alto Rendimiento**: Para visualizar grillas masivas sin sacrificar la fluidez, se implementa un renderizado sobre `<canvas>` con una estrategia de **dibujado diferencial**. Solo las células que cambian de estado entre generaciones son redibujadas, reduciendo drásticamente la carga de renderizado.

- **Lógica de Cómputo Optimizada**: El motor de la simulación utiliza una estrategia de **doble buffer** (`buffers alternos`). En lugar de crear y destruir arrays en cada ciclo, se alternan dos grillas para lectura y escritura, minimizando la presión sobre el recolector de basura y maximizando el rendimiento computacional.

- **Control sobre el Flujo del Tiempo**:

  - **Pausa y Reanudación**: Detén el universo en cualquier instante con la **Barra Espaciadora** para analizar patrones complejos.
  - **Intervención Divina**: Altera el destino del ecosistema haciendo clic sobre cualquier célula para darle vida o extinguirla.

- **Dinamismo y Caos**: Se ha introducido un sutil factor de "caos" en las reglas. Esta pequeña dosis de aleatoriedad previene el estancamiento en bucles estáticos y permite la exploración de nuevas y sorprendentes rutas evolutivas.

## Arquitectura y Pila Tecnológica

La estructura del proyecto sigue principios de arquitectura limpia, separando la lógica del estado y la interfaz de usuario para máxima claridad y mantenibilidad.

- **Framework**: [React](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Gestión de Estado**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

### Estructura del Código Fuente

```
/src
|-- /components  # Componentes de React (Grid, Cell)
|-- /hooks       # Hooks personalizados (useGridCalculation)
|-- /store       # Lógica de estado global con Zustand (gameStore)
|-- /types       # Definiciones de tipos de TypeScript
|-- /utils       # Lógica pura del juego (gameLogic)
|-- App.tsx      # Componente principal y orquestador
|-- main.tsx     # Punto de entrada de la aplicación
```

## Instalación y Ejecución Local

Para explorar este universo en tu propia máquina:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/felipecalderon/game-of-life-conway.git
   cd game-of-life-conway
   ```

2. **Instala las dependencias:**
   Se recomienda usar `pnpm` para una gestión de paquetes eficiente.

   ```bash
   pnpm install
   ```

3. **Inicia el servidor de desarrollo:**

   ```bash
   pnpm dev
   ```

   La simulación estará disponible en `http://localhost:5173`.

4. **Genera la build de producción:**
   ```bash
   pnpm build
   ```

## Licencia

Este proyecto se distribuye bajo la **Licencia Pública General de GNU v3 (GPLv3)**. Esto significa que eres libre de usar, modificar y distribuir el código, pero cualquier trabajo derivado debe ser también distribuido bajo esta misma licencia, garantizando que el conocimiento y sus mejoras permanezcan siempre abiertos.
