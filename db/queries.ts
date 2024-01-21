'use server'

import { db } from '@/db'
import { Row } from '@libsql/client'
import { unstable_noStore as noStore } from 'next/cache'

interface WallEntry extends Row {
  id: number
  user_name: string
  user_email: string
  user_pic: string
  user_message: string
  created_at: string
}

export async function getWallEntries() {
  noStore()
  let entries = await db.execute(
    'SELECT id, user_name, user_email, user_pic, user_message, created_at FROM wall ORDER BY created_at DESC LIMIT 100'
  )
  return entries.rows as WallEntry[]
}
