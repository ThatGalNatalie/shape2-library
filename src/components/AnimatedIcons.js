import React from 'react'
import Lottie from 'react-lottie'

import { handleIconFillColor } from '../utils/functions/fillAnimatedAsset'

const AnimatedIcons = ({ content, primaryColor, secondaryColor, size }) => {
  const { jsonCode1 } = content.fields

  const colors = {
    primaryColor: primaryColor,
    secondaryColor: secondaryColor
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: handleIconFillColor(jsonCode1, colors),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div>
      <Lottie options={defaultOptions} height={size} width={size} />
    </div>
  )
}

export default AnimatedIcons

AnimatedIcons.defaultProps = {
  size: 200,
  primaryColor: '#000',
  secondaryColor: '#000'
}
