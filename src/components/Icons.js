import React, { Fragment } from 'react'
import parse, { domToReact } from 'html-react-parser'
import {
  iconsKeysMap,
  renameKeys,
  differentiateFill,
  differentiateOffsetFill
} from '../utils/functions/parser.js'

// primaryColor: hex
// secondaryColor: hex
// backgroundColor: hex
// borderRadius: int || str

const Icons = ({
  content,
  size,
  backgroundColor,
  borderRadius,
  primaryColor,
  secondaryColor
}) => {
  const { code } = content.fields
  const options = {
    replace: ({ name, children, attribs }) => {
      if (name === 'svg') {
        return (
          <svg
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            {domToReact(children, options)}
          </svg>
        )
      }

      if (name === 'path' || name === 'rect' || name === 'circle') {
        if (attribs.fill === '#FF7373' || attribs.fill === '#CDFFA6') {
          const renamed = renameKeys(iconsKeysMap, attribs)
          delete renamed.style
          const fillType = differentiateFill(attribs, {
            fillOne: primaryColor,
            fillTwo: secondaryColor
          })

          const path = React.createElement(name, {
            ...renamed,
            [attribs['stroke'] && 'stroke']: primaryColor,
            [attribs['stroke-width'] && 'strokeWidth']: secondaryColor,
            ...fillType
          })
          // const offsetFillType = differentiateOffsetFill(attribs, {
          //   fillOffsetOne: '#0080FF',
          //   fillOffsetTwo: '#0080FF'
          // })
          // const pathDuplicated = React.createElement(name, {
          //   ...renamed,
          //   [attribs['stroke'] && 'stroke']: '#0080FF',
          //   [attribs['stroke-width'] && 'strokeWidth']: 0,
          //   ...offsetFillType,
          //   transform: 'translate(2,2)'
          // })
          return React.createElement(Fragment, null, path)
        }
      }
    }
  }
  const svgString = parse(code, options)

  return (
    <div
      style={{
        borderRadius: borderRadius && borderRadius,
        backgroundColor: backgroundColor && backgroundColor,
        width: size,
        height: size
      }}
    >
      {svgString}
    </div>
  )
}

export default Icons

Icons.defaultProps = {
  size: 100,
  borderRadius: '5px',
  backgroundColor: 'none',
  primaryColor: '#000',
  secondaryColor: '#000'
}
