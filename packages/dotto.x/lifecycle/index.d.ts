import type { DotXStore } from '../create-store'
import type { DotXAtom } from '../create-atom'

type LifecycleDep<Data> = DotXStore<Data> | DotXAtom<Data>

export function onGet<Data>(
  store: LifecycleDep<Data>,
  handler: (
    original: unknown[],
    api: { shared: any; event: { stop(): void } }
  ) => void
)

export function onSet<Data>(
  store: LifecycleDep<Data>,
  handler: (
    original: unknown[],
    api: { shared: any; event: { stop(): void }; methods: { abort(): void } }
  ) => void
)

export function onChange<Data>(
  store: LifecycleDep<Data>,
  handler: (
    original: unknown[],
    api: { shared: any; event: { stop(): void }; methods: { abort(): void } }
  ) => void
)

export function onCreate<Data>(
  store: LifecycleDep<Data>,
  handler: (original: unknown[], api: { shared: any }) => void
)

export function onOff<Data>(
  store: LifecycleDep<Data>,
  handler: (original: unknown[], api: { shared: any }) => void
)
