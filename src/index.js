import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { keys } from '../config'
// import styles from './styles.module.css'
import { createClient } from 'contentful'

// Components
import Icons from './components/Icons'
import Illustrations from './components/Illustrations'
import AnimatedIcons from './components/AnimatedIcons'
import AnimatedIllustrations from './components/AnimatedIllustrations'

const space = keys.space
const accessToken = keys.token

var client = createClient({
  space,
  accessToken
})

export const Shape = ({
  type = 'icons',
  id = '4GRljEmF0DX2Nnba4iYGK2',
  size,
  primaryColor,
  secondaryColor,
  backgroundColor,
  borderRadius
}) => {
  const [content, setContent] = useState({})
  useEffect(() => {
    const getEntryById = async (id) => {
      try {
        const entry = await client.getEntry(id)
        setContent(entry)
      } catch (error) {
        console.log('error while fetching the assets', error)
      }
    }
    getEntryById(id)
  }, [])

  const isEmpty = (obj) => Object.keys(obj).length === 0

  if (isEmpty(content)) {
    return <div>loading...</div>
  }
  if (type === 'icons') {
    return (
      <Icons
        content={content}
        size={size}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    )
  } else if (type === 'illustrations') {
    return (
      <Illustrations
        content={content}
        size={size}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    )
  } else if (type === 'animatedIcons') {
    return (
      <AnimatedIcons
        content={content}
        size={size}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    )
  } else if (type === 'animatedIllustrations') {
    return (
      <AnimatedIllustrations
        content={content}
        size={size}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
      />
    )
  } else {
    return <div>Invalid type or id. Could not fetch entry details.</div>
  }
}

Shape.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

Shape.defaultProps = {
  type: 'icons',
  id: '6XV7gUoakMkCupjpcLwCyg'
}
