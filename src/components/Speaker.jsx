import { Show, createSignal, onMount } from 'solid-js'
import { GitHubIcon } from './SocialIcons'

export default function Speaker(props) {
  const [user, setUser] = createSignal(null)
  const [loading, setLoading] = createSignal(true)
  const [error, setError] = createSignal(null)

  onMount(async () => {
    if (!props.login) {
      setError('No login provided')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/speaker/${props.login}`)
      if (!response.ok) {
        throw new Error('Failed to fetch speaker data')
      }
      const data = await response.json()
      setUser(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  })

  return (
    <Show
      when={!loading() && !error() && user()}
      fallback={
        <Show when={loading()}>
          <div class="text-sm text-zinc-500 dark:text-zinc-400">
            Loading speaker info...
          </div>
        </Show>
      }
    >
      <div class="flex gap-4 items-start mt-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
        <img
          class="w-16 h-16 rounded-full object-cover flex-shrink-0"
          src={user().avatarUrl}
          alt={user().name}
        />

        <div class="flex-1 min-w-0">
          <h4 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {user().name}
          </h4>
          <Show when={user().bio}>
            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {user().bio}
            </p>
          </Show>
          <div class="mt-2 flex items-center gap-4 text-sm">
            <Show when={user().location}>
              <span class="text-zinc-500 dark:text-zinc-400">
                📍 {user().location}
              </span>
            </Show>
            <a
              href={user().url}
              target="_blank"
              rel="noopener noreferrer"
              class="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 inline-flex items-center gap-1"
            >
              <GitHubIcon class="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </Show>
  )
}
