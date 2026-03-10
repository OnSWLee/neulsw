import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'kyunghee-blog',
  title: '경희늘품 블로그',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'hlql019b',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

