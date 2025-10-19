# Plataforma Sur Website

Sitio web corporativo de Plataforma Sur, desarrollado con Next.js 14 y alineado con el brandbook oficial de la empresa. Incluye estilo visual inspirado en Kellogg's con formas orgánicas, elementos flotantes y diseño dinámico manteniendo la identidad de marca.

## 🚀 Inicio Rápido

### Prerequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
npm start
```

## 🎨 Brandbook Compliance

Este sitio está completamente alineado con el brandbook oficial de Plataforma Sur:

### Identidad Visual
- **Colores**: Verde medianoche (#04444D) y Esmeralda (#04BA70)
- **Tipografía**: Outfit (Light, Regular, Medium, SemiBold, Bold, Black)
- **Logo**: Según especificaciones del brandbook

### ADN de Marca
- **Propósito**: "Conectar al mundo con la riqueza de Latinoamérica a través de una plataforma confiable, sólida y en constante expansión"
- **Historia**: "Plataforma Sur nació con una visión clara: llevar la riqueza de América Latina al mundo, sin barreras. Su historia comienza hace tres años..."
- **Narrativa clave**: "Del sur al mundo: calidad que cruza fronteras, relaciones que permanecen"
- **Esencia**: "Conectamos al mundo con lo mejor de Latinoamérica"

### Personalidad
- **Confiable**: Siempre cumple lo que promete
- **Ágil**: Responde con rapidez y eficiencia  
- **Cercana**: Crea vínculos humanos, no solo negocios
- **Inspiradora**: Contagia energía, transmite solidez y abre caminos

### Valores
- **Responsabilidad**: Cumplimos nuestros acuerdos, tiempos y compromisos. Nuestra palabra es la garantía para nuestros clientes
- **Calidad**: Solo comercializamos productos que superan estándares internacionales
- **Confianza**: Construimos relaciones duraderas, no transacciones pasajeras

### Territorio de Marca
- Exportación inteligente
- Conexión internacional
- Confianza estructural
- Versatilidad y proyección
- Solidez corporativa sin rigidez

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── contacto/
│   ├── historia/
│   ├── productos/
│   ├── servicios/
│   └── valores/
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
public/
└── images/
    ├── logos/
    ├── products/
    ├── services/
    └── hero/
```

## 🖼️ Sistema de Placeholders de Imágenes

### Estado Actual
El sitio usa placeholders grises con bordes punteados que indican qué imágenes necesitas agregar.

### Imágenes Requeridas

#### Logo Principal
- **Ubicación**: `public/images/logo-plataforma-sur.png`
- **Uso**: Header del sitio
- **Formato**: PNG con transparencia

#### Productos (según brandbook: granos, madera, cuero)
```
public/images/products/
├── granos.jpg     # Productos agrícolas
├── madera.jpg     # Productos forestales  
└── cuero.jpg      # Productos de cuero
```

#### Servicios (según territorio de marca)
```
public/images/services/
├── exportacion.jpg    # Exportación inteligente
├── conexion.jpg       # Conexión internacional
├── confianza.jpg      # Confianza estructural
└── versatilidad.jpg   # Versatilidad y proyección
```

### Cómo Reemplazar Placeholders

1. **Agregar imágenes** con los nombres exactos en las carpetas correspondientes
2. **Optimizar para web** (JPG para fotos, PNG para logos/gráficos)
3. **Reiniciar el servidor** de desarrollo para ver cambios

## 🎯 Características Técnicas

### Tech Stack
- **Framework**: Next.js 14 con App Router
- **Styling**: Tailwind CSS con estilo visual Kellogg's
- **Animations**: Framer Motion con animaciones orgánicas
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **TypeScript**: Incluido
- **Efectos**: Formas orgánicas, elementos flotantes y texturas

### Responsive Design
- Mobile-first approach
- Header adaptativo con menú hamburguesa
- Navegación siempre visible con fondo semi-transparente
- Elementos flotantes que se adaptan a diferentes pantallas

## 🎨 Sistema de Estilos

### Colores de Marca
```css
--midnight-green: #04444D
--emerald: #04BA70
--white: #FFFFFF
```

### Tipografía
```css
font-outfit-light: 300
font-outfit-regular: 400
font-outfit-medium: 500
font-outfit-semibold: 600
font-outfit-bold: 700
font-outfit-black: 800
```

### Componentes Utilitarios
```css
.btn-primary     # Botón principal con bordes orgánicos Kellogg's
.btn-secondary   # Botón secundario con formas asimétricas
.hero-gradient   # Gradiente de marca con texturas
.section-padding # Padding consistente de secciones
.container-custom # Contenedor max-width
.kelloggs-card   # Cards con formas orgánicas estilo Kellogg's
.kelloggs-section # Secciones con elementos ondulados
.floating-blob   # Elementos flotantes orgánicos
.kelloggs-texture # Texturas de fondo sutiles
```

## 📱 Páginas Implementadas

### Homepage (`/`)
- Hero con narrativa clave del brandbook
- Propósito y mensajes clave
- Personalidad de marca
- Valores fundamentales

### Historia (`/historia`)
- Historia oficial del brandbook (3 años)
- Misión y visión exactas
- Personalidad y valores
- Propósito y esencia de marca

### Productos (`/productos`)
- Productos mencionados en brandbook: granos, madera, cuero
- Valores aplicados: responsabilidad, calidad, confianza
- Placeholders de imágenes

### Servicios (`/servicios`)
- Territorio de marca aplicado
- Misión y visión
- Personalidad de marca
- Placeholders de imágenes

### Valores (`/valores`)
- Personalidad: Confiable, Ágil, Cercana, Inspiradora
- Valores: Responsabilidad, Calidad, Confianza
- Territorio de marca
- Palabras clave del brandbook
- Valor fundamental: "Comercio Internacional de Confianza"

### Contacto (`/contacto`)
- Formulario funcional
- Información de contacto
- Mensajes alineados con tono de voz del brandbook

## 🛠️ Desarrollo

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

### Tono de Voz (según brandbook)
- **Profesional, claro y confiable**
- **Sin arrogancia, con empatía**
- **Comunicación con precisión y humanidad**
- **Demostrando compromiso, estructura y capacidad de respuesta**

### Mensajes Clave del Brandbook
- "Exportamos valor, conectamos al mundo con propósito"
- "Relaciones que trascienden formalidades"
- "La confianza también se exporta"
- "Cumplimos, cuidamos, conectamos"
- "Latinoamérica al mundo, con estructura y visión"

## 🔧 Troubleshooting

### Problemas Comunes

**Las imágenes no aparecen:**
- Verificar que los archivos existan en `public/images/`
- Confirmar nombres exactos de archivos
- Reiniciar servidor de desarrollo

**Estilos no se aplican:**
- Verificar clases de Tailwind
- Comprobar configuración en `tailwind.config.ts`
- Limpiar cache con `npm run build`

## 🎨 Estilo Visual Kellogg's Implementado

### Elementos Orgánicos
- **kelloggs-card**: Cards con bordes asimétricos y formas orgánicas
- **floating-blob**: Elementos flotantes que cambian de forma
- **wave-decorator**: Decoradores ondulados para ambiente dinámico
- **kelloggs-texture**: Texturas de fondo con patrones sutiles

### Formas Características
- **Border-radius asimétricos**: `2rem 0.5rem 2rem 0.5rem`
- **Elementos superpuestos**: Layers flotantes con z-index
- **Composiciones asimétricas**: Layouts dinámicos no lineales
- **Curvas suaves**: Transiciones orgánicas entre secciones

### Animaciones Orgánicas
- **float-kelloggs**: Flotación con rotación y cambio de escala
- **Hover effects**: Transformaciones suaves con rotación ligera
- **Morphing borders**: Border-radius que cambia constantemente
- **Texturas animadas**: Backgrounds con movimiento sutil

### Componentes Estilo Kellogg's
```tsx
// Card con forma orgánica
<div className="kelloggs-card p-8">...</div>

// Sección con elementos flotantes
<section className="kelloggs-section">...</section>

// Elemento flotante decorativo
<div className="floating-blob w-32 h-32">...</div>

// Textura de fondo sutil
<div className="kelloggs-texture">...</div>
```

## 📄 Licencia

Todos los derechos reservados - Plataforma Sur

---

**Nota**: Todo el contenido está basado en el brandbook oficial. El estilo visual Kellogg's es puramente decorativo y mantiene la seriedad profesional de la marca, aplicando solo la "facha" visual sin afectar los lineamientos de identidad.