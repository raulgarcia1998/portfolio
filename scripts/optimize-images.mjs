/*
  Convierte las capturas originales de /capturas (PNG o JPG) a AVIF y WebP
  en varios anchos, y las deja en /public/proyectos.

  Uso: npm run images
  Al terminar imprime el ancho y alto de cada original para ponerlos en src/data/projects.js
*/
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'capturas'
const OUT = 'public/proyectos'
const WIDTHS = [800, 1600]

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g)$/i.test(f))

for (const file of files) {
  const name = path.parse(file).name
  const input = sharp(path.join(SRC, file))
  const { width, height } = await input.metadata()

  for (const w of WIDTHS.filter((w) => w <= width)) {
    const resized = input.clone().resize({ width: w })
    await resized.clone().avif({ quality: 55 }).toFile(`${OUT}/${name}-${w}.avif`)
    await resized.clone().webp({ quality: 78 }).toFile(`${OUT}/${name}-${w}.webp`)
  }
  console.log(`${name}: ${width} x ${height}`)
}
