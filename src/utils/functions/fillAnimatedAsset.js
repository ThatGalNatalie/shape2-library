const presetColorList = [
  [242, 71, 56, 1],
  [255, 255, 255, 1],
  [241, 241, 242, 1],
  [26, 26, 26, 1],
  [163, 106, 106, 1],
  [29, 29, 29, 1],
  [112, 161, 164, 1],
  [42, 7, 112, 1],
  [32, 71, 102, 1],
  [95, 150, 167, 1],
  [34, 166, 179, 1],
  [8, 169, 166, 1],
  [255, 238, 176, 1],
  [255, 216, 80, 1],
  [113, 177, 190, 1],
  [28, 92, 107, 1],
  [31, 124, 119, 1]
]

if (Array.prototype.equals)
  console.warn(
    "Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."
  )
// attach the .equals method to Array's prototype to call it on any array, eslint goes crazy here
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array) return false

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false
    }
  }
  return true
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, 'equals', { enumerable: false })

const scaleRGBValue = (color) => {
  // scales color value between 0 and 1
  return [color.r / 255, color.g / 255, color.b / 255, color.a]
}

// from stackoverflow: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

export const handleFillColor = (colors, jsonObject) => {
  const json = JSON.parse(jsonObject)
  const { primaryColor, secondaryColor } = colors
  try {
    json.layers.map((item, index) => {
      if (item.shapes !== undefined) {
        item.shapes[0].it.map((innerItem, innerIndex) => {
          if (innerItem.ty === 'fl') {
            const animatedAssetColorLayers = innerItem.c.k.map((x, index) => {
              return index !== 3 ? Math.round(x * 255) : 1
            })

            // updates the alpha color
            animatedAssetColorLayers.map((item, index) => {
              return index === 3 && item > 0.6 ? 1 : 0
            })

            // compares colored layers from the assets with the preset color layer
            // to target layers
            presetColorList.map((color, index) => {
              if (animatedAssetColorLayers.equals(color)) {
                if (index % 2 === 0) {
                  innerItem.c.k = scaleRGBValue(hexToRgb(primaryColor))
                } else {
                  innerItem.c.k = scaleRGBValue(hexToRgb(secondaryColor))
                }
              }
            })
          }
        })
      }
    })
  } catch (error) {}
  return json
}

export const handleIconFillColor = (jsonObject, colors) => {
  const { primaryColor, secondaryColor } = colors
  var json = JSON.parse(jsonObject)

  try {
    for (let index = 0; index < json.assets[0].layers.length; index++) {
      for (
        let innerIndex = 0;
        innerIndex < json.assets[0].layers[index].shapes[0].it.length;
        innerIndex++
      ) {
        if (json.assets[0].layers[index].shapes[0].it[innerIndex].ty === 'fl') {
          if (index % 2 == 0) {
            json.assets[0].layers[index].shapes[0].it[innerIndex].c.k = [
              hexToRgb(primaryColor).r / 255,
              hexToRgb(primaryColor).g / 255,
              hexToRgb(primaryColor).b / 255
            ]
          } else {
            json.assets[0].layers[index].shapes[0].it[innerIndex].c.k = [
              hexToRgb(secondaryColor).r / 255,
              hexToRgb(secondaryColor).g / 255,
              hexToRgb(secondaryColor).b / 255
            ]
          }
        }
        // console.log(json.assets[0].layers[index].shapes[0].it[innerIndex].nm)
      }
    }
  } catch (error) {
    try {
      for (let index = 0; index < json.layers.length; index++) {
        for (
          let innerIndex = 0;
          innerIndex < json.layers[index].shapes[0].it.length;
          innerIndex++
        ) {
          if (json.layers[index].shapes[0].it[innerIndex].ty === 'st') {
            if (index % 2 == 0) {
              json.layers[index].shapes[0].it[innerIndex].c.k = [
                hexToRgb(primaryColor).r / 255,
                hexToRgb(primaryColor).g / 255,
                hexToRgb(primaryColor).b / 255,
                1
              ]
            } else {
              json.layers[index].shapes[0].it[innerIndex].c.k = [
                hexToRgb(secondaryColor).r / 255,
                hexToRgb(secondaryColor).g / 255,
                hexToRgb(secondaryColor).b / 255,
                1
              ]
            }
          }
          //console.log(json.layers[index].shapes[0].it[innerIndex].nm)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  return json
}
