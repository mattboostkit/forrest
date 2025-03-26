import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'forrest',
  title: 'Forrest Blog',
  projectId: 'ap5b0e0o',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})