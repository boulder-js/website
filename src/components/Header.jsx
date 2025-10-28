import { DiamondIcon } from './DiamondIcon'

export function Header() {
  return (
    <header class="relative z-50 flex-none lg:pt-11 bg-transparent">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap bg-transparent">
        <div class="mt-10 lg:mt-0 lg:grow lg:basis-0">
          <a href="/">
            <span class="sr-only">BoulderJS</span>
            <img
              src="/assets/boulderjs-logo.png"
              alt="BoulderJS Logo"
              class="h-12 w-auto"
            />
          </a>
        </div>
        <div class="order-first -mx-4 flex flex-auto basis-full overflow-x-auto border-b border-blue-600/10 py-4 font-mono text-sm whitespace-nowrap text-blue-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
          <div class="mx-auto flex items-center gap-4 px-4">
            <p>Every 4th Thursday</p>
            <DiamondIcon class="h-1.5 w-1.5 overflow-visible fill-current stroke-current" />
            <p>Boulder, CO</p>
          </div>
        </div>
        <div class="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <a
            href="https://lu.ma/boulderjs"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex justify-center rounded-2xl bg-blue-600 px-4 py-2.5 text-base font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70 transition-colors"
          >
            Get your tickets
          </a>
        </div>
      </div>
    </header>
  )
}
