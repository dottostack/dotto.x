import { DotXStore } from '../create-store'

type Handlers = {
  get(original: unknown[], api: { shared: any; event: { stop(): void } }): void

  off?(original: unknown[], api: { shared: any }): void

  create?(original: unknown[], api: { shared: any }): void

  set(
    original: unknown[],
    api: { shared: any; event: { stop(): void }; methods: { abort(): void } }
  ): void

  change?(
    original: unknown[],
    api: { shared: any; event: { stop(): void }; methods: { abort(): void } }
  ): void
}

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
