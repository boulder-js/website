import { For, createSignal } from 'solid-js'
import { A } from '@solidjs/router'

const navItems = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Events',
    href: '/events'
  },
  {
    name: 'Speakers',
    href: '/speakers'
  },
  {
    name: 'Participating Groups',
    href: '/groups'
  },
  {
    name: 'About',
    href: '/about'
  }
]

export function Header() {
  const [menuOpen, setMenuOpen] = createSignal(false)

  return (
    <header class="">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 "
        aria-label="Global"
      >
        <div class="flex flex-1">
          <div class="hidden lg:flex lg:gap-x-12">
            <For each={navItems}>
              {(item) => (
                <A
                  href={item.href}
                  class="text-sm font-semibold leading-6 text-gray-900 dark:text-zinc-400"
                >
                  {item.name}
                </A>
              )}
            </For>
          </div>
          <div class="flex lg:hidden">
            <button
              type="button"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMenuOpen(true)}
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <A href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">BoulderJS</span>
          <img
            src="/assets/boulderjs-logo.png"
            width="100%"
            height="100%"
            class="w-24 h-24"
          />
        </A>
        <div class="flex flex-1 justify-end" />
      </nav>
      <div
        class={menuOpen() ? 'lg:hidden' : 'hidden'}
        role="dialog"
        aria-modal="true"
      >
        <div class="fixed inset-0 z-10" />
        <div class="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
          <div class="flex items-center justify-between">
            <div class="flex flex-1">
              <button
                type="button"
                class="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                <span class="sr-only">Close menu</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex flex-1 justify-end" />
          </div>
          <div class="mt-6 space-y-2">
            <For each={navItems}>
              {(item) => (
                <A
                  href={item.href}
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-zinc-400"
                >
                  {item.name}
                </A>
              )}
            </For>
          </div>
        </div>
      </div>
    </header>
  )
}
