export const iconsKeysMap = {
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'fill-opacity': 'fillOpacity',
  'stroke-opacity': 'strokeOpacity',
  'stroke-dasharray': 'strokeDasharray'
}

export const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  )

export const differentiateFill = (att, fills) => {
  const { fillOne, fillTwo } = fills
  if (att.fill === '#FF7373') return { fill: fillOne }
  if (att.fill === '#CDFFA6') return { fill: fillTwo }
}

export const differentiateOffsetFill = (att, fills) => {
  const { fillOffsetOne, fillOffsetTwo } = fills
  if (att.fill === '#FF7373') return { fill: fillOffsetOne }
  if (att.fill === '#CDFFA6') return { fill: fillOffsetTwo }
}

const passStrokeProps = (strokeColor, strokeWidth) => (createStroke) => {
  if (createStroke) return { stroke: strokeColor, strokeWidth: strokeWidth }
  return null
}

// Illustrations
export const createFillAndStroke = (att, fills, strokeOpts) => {
  const { fillOne, fillTwo, fillThree } = fills
  const { strokeToBeCreated, strokeColor, strokeWidth } = strokeOpts
  const createStroke = passStrokeProps(strokeColor, strokeWidth)

  if (att.fill === '#005B9D')
    return {
      fill: fillOne,
      ...createStroke(strokeToBeCreated === 'fillOne')
    }
  if (att.fill === '#FFE458')
    return {
      fill: fillTwo,
      ...createStroke(strokeToBeCreated === 'fillTwo')
    }
  if (att.fill === '#78D2EE')
    return {
      fill: fillThree,
      ...createStroke(strokeToBeCreated === 'fillThree')
    }
}
