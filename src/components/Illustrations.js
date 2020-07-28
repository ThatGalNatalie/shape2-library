import React from 'react'
import parse, { domToReact } from 'html-react-parser'

import {
  renameKeys,
  iconsKeysMap,
  createFillAndStroke
} from '../utils/functions/parser'

const Illustrations = ({ content, size, primaryColor, secondaryColor }) => {
  const { code1 } = content.fields
  const variation = {
    fillOne: primaryColor,
    fillTwo: secondaryColor,
    fillThree: primaryColor,
    strokeColor: 'none'
  }
  const createOutline = (strokeToBeCreated) =>
    strokeToBeCreated === 'all' && {
      stroke: variation.strokeColor,
      strokeWidth: '3'
    }
  const options = {
    replace: ({ name, children, attribs }) => {
      if (name === 'svg') {
        return (
          <svg
            width={parseInt(size).toString()}
            height={parseInt(size * 0.75).toString()}
            viewBox='0 0 800 600'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            {domToReact(children, options)}
          </svg>
        )
      }

      if (name === 'path' || name === 'rect' || name === 'circle') {
        const renamed = renameKeys(iconsKeysMap, attribs)
        delete renamed.style
        const outline = createOutline('fillOne')
        const fillAndStroke = createFillAndStroke(
          attribs,
          {
            fillOne: variation.fillOne,
            fillTwo: variation.fillTwo,
            fillThree: variation.fillThree
          },
          {
            strokeToBeCreated: 'fillOne',
            strokeColor: variation.strokeColor,
            strokeWidth: '3'
          }
        )
        return React.createElement(name, {
          ...renamed,
          ...outline,
          ...fillAndStroke
        })
      }
    }
  }

  const svgString = parse(code1, options)

  return <div>{svgString}</div>
}

export default Illustrations

Illustrations.defaultProps = {
  size: 100,
  primaryColor: '#000',
  secondaryColor: '#000'
}
