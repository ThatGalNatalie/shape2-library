import React from 'react'
import Lottie from 'react-lottie'

import { handleFillColor } from '../utils/functions/fillAnimatedAsset'

const AnimatedIllustrations = ({
  content,
  primaryColor,
  secondaryColor,
  size,
  backgroundColor,
  borderRadius
}) => {
  const { jsonCode1, jsonCode2, jsonCode3 } = content.fields
  const jsonString = [jsonCode1, jsonCode2, jsonCode3].join('')

  const colors = {
    primaryColor: primaryColor,
    secondaryColor: secondaryColor
  }
  const jsonObj = handleFillColor(colors, jsonString)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: jsonObj,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div
      style={{
        borderRadius: borderRadius,
        backgroundColor: backgroundColor,
        display: 'inline-block'
      }}
    >
      <Lottie options={defaultOptions} height={size} width={size} />
    </div>
  )
}
export default AnimatedIllustrations

AnimatedIllustrations.defaultProps = {
  size: 200,
  primaryColor: '#000',
  secondaryColor: '#000',
  backgroundColor: 'none',
  borderRadius: '5px'
}
