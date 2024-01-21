import { guestbookPageConfig } from '@/site.config'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { auth } from 'app/auth'
import { SignIn, SignOut } from '@/components/auth/buttons'
import { getGuestbookEntries } from '@/db/queries'
import MessageForm, { DeleteEntry } from '@/components/pages/wall-form'

export const metadata: Metadata = {
  title: guestbookPageConfig.title,
  description: guestbookPageConfig.description,
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-4">Write on the wall.</h1>
      <Suspense>
        <WallForm />
        <WallEntries />
      </Suspense>
    </section>
  )
}

async function WallForm() {
  let session = await auth()

  return session?.user ? (
    <>
      <MessageForm />
      <SignOut />
    </>
  ) : (
    <SignIn />
  )
}

async function WallEntries() {
  let entries = await getGuestbookEntries()
  let session = await auth()

  if (entries.length === 0) {
    return null
  }

  const isUserAuthorizedToDelete = (entry) => {
    return (
      session?.user?.email === entry.user_email ||
      session?.user?.email === 'david@czachor.dev'
    )
  }

  return (
    <div className="pt-2">
      {entries.map((entry) => (
        <article
          key={entry.id}
          className="mb-2 space-x-1.5 text-sm "
        >
          {isUserAuthorizedToDelete(entry) && <DeleteEntry id={entry.id} />}

          <span className="min-w-fit pr-1.5 text-muted-foreground">
            <img
              src={entry.user_pic}
              alt={`Profile picture of ${entry.user_name}`}
              width={16}
              height={16}
              className="-mt-0.5 mr-1.5 inline h-4 w-4 rounded-full"
            />
            {entry.user_name}:
          </span>
          {entry.user_message}
        </article>
      ))}
    </div>
  )
}