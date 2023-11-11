/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    projects: Projects
    blogs: Blogs
    users: User
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  globals: {
    settings: Settings
  }
}
export interface Projects {
  id: number
  title: string
  description: string
  link: string
  updatedAt: string
  createdAt: string
}
export interface Blogs {
  id: number
  title: string
  updatedAt: string
  createdAt: string
}
export interface User {
  id: number
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password: string | null
}
export interface PayloadPreference {
  id: number
  user: {
    relationTo: 'users'
    value: number | User
  }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
export interface PayloadMigration {
  id: number
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}
export interface Settings {
  id: number
  navItems?:
    | {
        label?: string | null
        href?: string | null
        id?: string | null
      }[]
    | null
  linkedIn?: string | null
  github?: string | null
  updatedAt?: string | null
  createdAt?: string | null
}

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
