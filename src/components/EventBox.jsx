import { Switch, Match, splitProps } from 'solid-js'
import { A } from '@solidjs/router'
import { H3 } from './Atomic'

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function EventBox(props) {
  const [local] = splitProps(props, ['event'])

  return (
    <article class="flex flex-col items-start justify-between">
      <A href={`/events/${local.event.number}`}>
        <div class="relative w-full">
          <Switch>
            <Match when={local.event.facets?.['featured-image']?.images?.[0]}>
              <img
                src={local.event.facets['featured-image'].images[0].src}
                alt={
                  local.event.facets['featured-image'].images[0].alt ||
                  local.event.title
                }
                class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
            </Match>
            <Match when={!local.event.facets?.['featured-image']?.images?.[0]}>
              <img
                src="/assets/boulderjs-logo.png"
                alt="BoulderJS Logo"
                class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-contain p-8 sm:aspect-[2/1] lg:aspect-[3/2]"
              />
            </Match>
          </Switch>
          <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      </A>
      <div class="max-w-xl">
        <div class="mt-8 flex items-center gap-x-4 text-xs">
          <time
            dateTime={local.event.facets?.date?.date}
            class="text-gray-500 dark:text-gray-400"
          >
            {formatDate(local.event.facets?.date?.date)}
          </time>
        </div>
        <div class="group relative">
          <H3>
            <A
              href={`/events/${local.event.number}`}
              class="hover:text-teal-600 dark:hover:text-teal-400"
            >
              {local.event.title}
            </A>
          </H3>
        </div>
      </div>
    </article>
  )
}
