import path from 'path'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload/config'
import Users from './collections/users'
import { Blogs } from './collections/blogs'
import { Projects } from './collections/projects'
import { Settings } from './globals/settings'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { webpackBundler } from '@payloadcms/bundler-webpack'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    process.env.PAYLOAD_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  editor: lexicalEditor({}),
  collections: [Projects, Blogs, Users],
  globals: [Settings],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})