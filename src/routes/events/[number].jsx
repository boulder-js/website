import { createSignal, onMount, Show, For, Switch, Match } from 'solid-js'
import { useParams, A } from '@solidjs/router'
import { SolidMarkdown } from 'solid-markdown'
import { Container } from '~/components/Container'
import { SimpleLayout } from '~/components/SimpleLayout'
import { H1, H2, H3 } from '~/components/Atomic'
import { Prose } from '~/components/Prose'
import Speaker from '~/components/Speaker'

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function ReactionBadge(props) {
  const reactionEmojis = {
    THUMBS_UP: '👍',
    THUMBS_DOWN: '👎',
    LAUGH: '😄',
    HOORAY: '🎉',
    CONFUSED: '😕',
    HEART: '❤️',
    ROCKET: '🚀',
    EYES: '👀'
  }

  return (
    <Show when={props.reactions && props.reactions.length > 0}>
      <div class="flex gap-2 flex-wrap">
        <For each={Object.keys(reactionEmojis)}>
          {(reactionType) => {
            const count = props.reactions.filter(
              (r) => r === reactionType
            ).length
            return (
              <Show when={count > 0}>
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">
                  {reactionEmojis[reactionType]} {count}
                </span>
              </Show>
            )
          }}
        </For>
      </div>
    </Show>
  )
}

export default function EventDetail() {
  const params = useParams()
  const [event, setEvent] = createSignal(null)
  const [pastEvents, setPastEvents] = createSignal([])
  const [loading, setLoading] = createSignal(true)
  const [error, setError] = createSignal(null)

  onMount(async () => {
    try {
      // Fetch event details
      const response = await fetch(`/api/events/${params.number}`)
      if (!response.ok) {
        throw new Error('Event not found')
      }
      const data = await response.json()
      setEvent(data)

      // Fetch past events
      try {
        const eventsResponse = await fetch('/api/events')
        const allEvents = await eventsResponse.json()
        // Get 3 most recent past events (excluding current)
        setPastEvents(
          allEvents
            .filter((e) => e.number !== data.number)
            .slice(0, 3)
        )
      } catch (e) {
        console.error('Failed to fetch past events:', e)
      }

      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  })

  return (
    <Show
      when={!loading() && !error()}
      fallback={
        <Container class="mt-16 sm:mt-32">
          <Show when={error()}>
            <div class="text-center">
              <H1>Event Not Found</H1>
              <p class="mt-4 text-zinc-600 dark:text-zinc-400">{error()}</p>
              <A
                href="/"
                class="mt-8 inline-block text-teal-500 hover:text-teal-600"
              >
                ← Back to home
              </A>
            </div>
          </Show>
          <Show when={!error()}>
            <div class="text-center">
              <p class="text-zinc-600 dark:text-zinc-400">Loading event...</p>
            </div>
          </Show>
        </Container>
      }
    >
      <Container class="mt-16 sm:mt-32">
        <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          {/* Event Image */}
          <div class="lg:pl-20">
            <div class="max-w-xs px-2.5 lg:max-w-none">
              <Switch>
                <Match
                  when={
                    event()?.facets?.['featured-image']?.images?.[0]?.src
                  }
                >
                  <img
                    src={event().facets['featured-image'].images[0].src}
                    alt={
                      event().facets['featured-image'].images[0].alt ||
                      event().title
                    }
                    class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                  />
                </Match>
                <Match
                  when={
                    !event()?.facets?.['featured-image']?.images?.[0]?.src
                  }
                >
                  <img
                    src="/assets/boulderjs-logo.png"
                    alt="BoulderJS Logo"
                    class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-contain p-8 dark:bg-zinc-800"
                  />
                </Match>
              </Switch>
            </div>

            {/* Event Details Sidebar */}
            <div class="mt-8 space-y-8">
              {/* Date & Time */}
              <Show when={event()?.facets?.date?.date}>
                <div class="border-l-4 border-teal-500 pl-4">
                  <div class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    When
                  </div>
                  <div class="mt-2 text-sm text-zinc-900 dark:text-zinc-100">
                    {formatDate(event().facets.date.date)}
                    <Show when={event()?.facets?.time?.time}>
                      <br />
                      {event().facets.time.time}
                    </Show>
                    <Show when={event()?.facets?.duration?.text}>
                      <br />
                      <span class="text-zinc-600 dark:text-zinc-400">
                        Duration: {event().facets.duration.text}
                      </span>
                    </Show>
                  </div>
                </div>
              </Show>

              {/* Location */}
              <Show when={event()?.facets?.location?.text}>
                <div class="border-l-4 border-teal-500 pl-4">
                  <div class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    Where
                  </div>
                  <div class="mt-2 text-sm text-zinc-900 dark:text-zinc-100">
                    {event().facets.location.text}
                  </div>
                </div>
              </Show>

              {/* Reactions */}
              <Show when={event()?.reactions}>
                <div class="border-l-4 border-teal-500 pl-4">
                  <div class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                    Reactions
                  </div>
                  <ReactionBadge reactions={event().reactions} />
                </div>
              </Show>

              {/* RSVP Section */}
              <div class="border-l-4 border-teal-500 pl-4">
                <div class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  RSVP
                </div>
                <a
                  href={event()?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition"
                >
                  RSVP on GitHub →
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div class="lg:order-first lg:row-span-2">
            <H1>{event()?.title}</H1>

            {/* Event Description */}
            <Show when={event()?.facets?.['event-description']?.text}>
              <div class="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                <Prose>
                  <SolidMarkdown>
                    {event().facets['event-description'].text}
                  </SolidMarkdown>
                </Prose>
              </div>
            </Show>

            {/* Talks Section */}
            <Show when={event()?.talks && event().talks.length > 0}>
              <div class="mt-12">
                <H2>Talks</H2>
                <div class="mt-6 space-y-8">
                  <For each={event().talks}>
                    {(talk) => (
                      <div class="border-l-2 border-zinc-200 dark:border-zinc-700 pl-6 py-2">
                        <H3>{talk.title}</H3>
                        <Show when={talk.facets?.['talk-description']?.text}>
                          <div class="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <Prose>
                              <SolidMarkdown>
                                {talk.facets['talk-description'].text}
                              </SolidMarkdown>
                            </Prose>
                          </div>
                        </Show>
                        <Show when={talk.reactions && talk.reactions.length > 0}>
                          <div class="mt-3">
                            <ReactionBadge reactions={talk.reactions} />
                          </div>
                        </Show>
                        {/* Speaker Information */}
                        <Show
                          when={
                            talk.facets?.speaker?.text ||
                            talk.facets?.speakers?.list?.[0]?.text
                          }
                        >
                          <Speaker
                            login={
                              talk.facets?.speaker?.text ||
                              talk.facets?.speakers?.list?.[0]?.text
                            }
                          />
                        </Show>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </Show>

            {/* Code of Conduct */}
            <Show when={event()?.facets?.['code-of-conduct']}>
              <div class="mt-12 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <H3>Code of Conduct</H3>
                <div class="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <Prose>
                    <SolidMarkdown>
                      {event().facets['code-of-conduct'].list?.[0]?.text ||
                        event().facets['code-of-conduct'].text}
                    </SolidMarkdown>
                  </Prose>
                </div>
              </div>
            </Show>

            {/* Past Events */}
            <Show when={pastEvents().length > 0}>
              <div class="mt-12">
                <H2>Recent Events</H2>
                <div class="mt-6 space-y-4">
                  <For each={pastEvents()}>
                    {(pastEvent) => (
                      <A
                        href={`/events/${pastEvent.number}`}
                        class="block p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-teal-500 dark:hover:border-teal-500 transition"
                      >
                        <div class="font-medium text-zinc-900 dark:text-zinc-100">
                          {pastEvent.title}
                        </div>
                        <Show when={pastEvent.facets?.date?.date}>
                          <div class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                            {formatDate(pastEvent.facets.date.date)}
                          </div>
                        </Show>
                      </A>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </Container>
    </Show>
  )
}
