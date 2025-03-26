import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './structure/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Forrest',

  projectId: 'ap5b0e0o',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure
    }), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
