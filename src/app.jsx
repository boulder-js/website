// @refresh reload
import { Suspense } from 'solid-js'
import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

import './app.css'

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <div class="h-full bg-zinc-50 dark:bg-black">
            <Title>BoulderJS - Home</Title>
            {/* <Suspense>
              <Show when={announcement()}>
                <Announcement announcement={announcement} />
              </Show>
            </Suspense> */}
            <Header />
            <Suspense>{props.children}</Suspense>
            <Footer />
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
