import { DotXStore } from '../create-store'

export function onGet<Data>(
  store: DotXStore<Data>,
  handler: (
    original: unknown[],
    api: { shared: any; event: { stop(): void } }
  ) => void
)

export function onSet<Data>(
  store: DotXStore<Data>,
  handler: (
    original: unknown[],
    api: { shared: any; event: { stop(): void }; methods: { abort(): void } }
  ) => void
)

export function onChange<Data>(
  store: DotXStore<Data>,
  handler: (
    original: unknown[],
    api: { shared: any; event: { stop(): void }; methods: { abort(): void } }
  ) => void
)

export function onCreate<Data>(
  store: DotXStore<Data>,
  handler: (original: unknown[], api: { shared: any }) => void
)

export function onOff<Data>(
  store: DotXStore<Data>,
  handler: (original: unknown[], api: { shared: any }) => void
)
