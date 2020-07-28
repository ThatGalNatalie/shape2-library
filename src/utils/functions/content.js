import { createClient } from 'contentful'
const space = 'b7cuteq4r550'
const accessToken = 'LyRnPg5XSZ0geCyYkS6H0nCoI_cB-oO_2TiApasoJZ0'

var client = createClient({
  space,
  accessToken
})

export const getEntryById = async (id) => {
  try {
    const entry = await client.getEntry(id)
    return entry
  } catch (error) {
    console.log('error while fetching the assets', error)
  }
}
