function EventBox(props) {
  return (
    <article class="flex flex-col items-start justify-between">
      <A href={`/events/${local.event.number}`}>
        <div class="relative w-full">
          <Switch>
            <Match when={issueData()['featured-image']?.images?.[0]}>
              <img
                src={issueData()['featured-image']?.images?.[0]?.src}
                alt={issueData()['featured-image']?.images?.[0]?.alt}
                class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
            </Match>
            <Match when={!issueData()['featured-image']?.images?.[0]}>
              <img
                src="/assets/boulderjs-logo.png"
                alt="BoulderJS Logo"
                class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-contain sm:aspect-[2/1] lg:aspect-[3/2]"
              />
            </Match>
          </Switch>
          <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      </A>
      <div class="max-w-xl">
        <div class="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={issueData().date.date} class="text-gray-500">
            {issueData().date.date}
          </time>
        </div>
        <div class="group relative">
          <H3>
            <a href={local.event.href}>
              <span class="absolute inset-0" />
              <A href={`/events/${local.event.number}`}>{local.event.title}</A>
            </a>
          </H3>
        </div>
        {/* <div class="relative mt-8 flex items-center gap-x-4">
          <img
            src={props.event.author.imageUrl}
            alt=""
            class="h-10 w-10 rounded-full bg-gray-100"
          />
          <div class="text-sm leading-6">
            <p class="font-semibold text-gray-900">
              <a href={props.event.author.href}>
                <span class="absolute inset-0" />
                {props.event.author.name}
              </a>
            </p>
          </div>
        </div> */}
      </div>
    </article>
  )
}
