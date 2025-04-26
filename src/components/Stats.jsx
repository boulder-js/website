function Stats(props) {
  const stats = createMemo(() => {
    return [
      {
        name: 'GitHub Organization Members',
        value: props.organization()?.organization?.membersWithRole?.totalCount
      },
      {
        name: 'Users on Discord',
        value: '300+'
        // TODO: get this via api
      },
      {
        name: 'Events',
        value: props.organization()?.repository?.issues?.totalCount
      },
      {
        name: 'Boulder',
        value: '100%'
      }
    ]
  })

  return (
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none">
          <div class="text-center">
            <H2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your Tech Community in Boulder
            </H2>
            {/* <p class="mt-4 text-lg leading-8 text-gray-600">
              Lorem ipsum dolor sit amet consect adipisicing possimus.
            </p> */}
          </div>
          <dl class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            <For each={stats()}>
              {(stat) => (
                <div class="flex flex-col bg-gray-400/5 p-8">
                  <dt class="text-sm font-semibold leading-6 text-gray-600">
                    {stat.name}
                  </dt>
                  <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              )}
            </For>
          </dl>
        </div>
      </div>
    </div>
  )
}
