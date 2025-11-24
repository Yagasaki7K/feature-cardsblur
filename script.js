import gsap from 'https://cdn.skypack.dev/gsap@3.13.0'
import Draggable from 'https://cdn.skypack.dev/gsap@3.13.0/Draggable'
import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4'

gsap.registerPlugin(Draggable)

const config = {
  theme: 'system',
  iconBlur: 28,
  iconSaturate: 5,
  iconBrightness: 1.3,
  iconContrast: 1.4,
  iconScale: 3.4,
  iconOpacity: 0.25,
  borderWidth: 3,
  borderBlur: 0,
  borderSaturate: 4.2,
  borderBrightness: 2.5,
  borderContrast: 2.5,
  exclude: false,
}

const ctrl = new Pane({
  title: 'config',
  expanded: false,
})

const update = () => {
  document.documentElement.dataset.theme = config.theme

  const blurNode = document.querySelector('filter#blur feGaussianBlur')
  if (blurNode)
    blurNode.setAttribute('stdDeviation', String(config.iconBlur))

  const root = document.documentElement.style
  root.setProperty('--icon-saturate', config.iconSaturate)
  root.setProperty('--icon-brightness', config.iconBrightness)
  root.setProperty('--icon-contrast', config.iconContrast)
  root.setProperty('--icon-scale', config.iconScale)
  root.setProperty('--icon-opacity', config.iconOpacity)

  root.setProperty('--border-width', config.borderWidth)
  root.setProperty('--border-blur', config.borderBlur)
  root.setProperty('--border-saturate', config.borderSaturate)
  root.setProperty('--border-brightness', config.borderBrightness)
  root.setProperty('--border-contrast', config.borderContrast)

  document.documentElement.dataset.exclude = String(config.exclude)
}

const sync = () => {
  if (!document.startViewTransition) return update()
  document.startViewTransition(() => update())
}

const iconFolder = ctrl.addFolder({ title: 'icon', expanded: true })

iconFolder.addBinding(config, 'iconBlur', {
  label: 'blur',
  min: 0,
  max: 100,
  step: 1,
})

iconFolder.addBinding(config, 'iconSaturate', {
  label: 'saturate',
  min: 0,
  max: 10,
  step: 0.1,
})

iconFolder.addBinding(config, 'iconBrightness', {
  label: 'brightness',
  min: 0,
  max: 4,
  step: 0.1,
})

iconFolder.addBinding(config, 'iconContrast', {
  label: 'contrast',
  min: 0,
  max: 3,
  step: 0.1,
})

iconFolder.addBinding(config, 'iconScale', {
  label: 'scale',
  min: 0,
  max: 6,
  step: 0.1,
})

iconFolder.addBinding(config, 'iconOpacity', {
  label: 'opacity',
  min: 0,
  max: 1,
  step: 0.01,
})

const borderFolder = ctrl.addFolder({ title: 'border', expanded: true })

borderFolder.addBinding(config, 'borderWidth', {
  label: 'width',
  min: 1,
  max: 6,
  step: 1,
})

borderFolder.addBinding(config, 'borderBlur', {
  label: 'blur',
 min: 0,
  max: 100,
  step: 1,
})

borderFolder.addBinding(config, 'borderSaturate', {
  label: 'saturate',
  min: 0,
  max: 10,
  step: 0.1,
})

borderFolder.addBinding(config, 'borderBrightness', {
  label: 'brightness',
  min: 0,
  max: 4,
  step: 0.1,
})

borderFolder.addBinding(config, 'borderContrast', {
  label: 'contrast',
  min: 0,
  max: 3,
  step: 0.1,
})

ctrl.addBinding(config, 'exclude')

ctrl.addBinding(config, 'theme', {
  label: 'theme',
  options: {
    system: 'system',
    light: 'light',
    dark: 'dark',
  },
})

ctrl.on('change', sync)

update()

const tweakSelector = '.tp-dfwv'
const draggable = Draggable.create(tweakSelector, {
  type: 'x,y',
  allowEventDefault: true,
  trigger: tweakSelector + ' button.tp-rotv_b',
})

document.querySelector(tweakSelector)?.addEventListener('dblclick', () => {
  gsap.to(tweakSelector, {
    x: `+=${draggable[0].x * -1}`,
    y: `+=${draggable[0].y * -1}`,
    onComplete: () => gsap.set(tweakSelector, { clearProps: 'all' }),
  })
})

const articles = document.querySelectorAll('article')

document.addEventListener('pointermove', (event) => {
  articles.forEach((article) => {
    const rect = article.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const relativeX = event.clientX - centerX
    const relativeY = event.clientY - centerY
    const x = relativeX / (rect.width / 2)
    const y = relativeY / (rect.height / 2)
    article.style.setProperty('--pointer-x', x.toFixed(3))
    article.style.setProperty('--pointer-y', y.toFixed(3))
  })
})
