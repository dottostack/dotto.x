import { DotXStore } from '../create-store'

type Handlers = {
  get?(original: unknown[], api: { shared: any; event: { stop(): void } }): void

  off?(original: unknown[], api: { shared: any }): void

  create?(original: unknown[], api: { shared: any }): void

  set?(
    original: unknown[],
    api: { shared: any; event: { stop(): void }; methods: { abort(): void } }
  ): void

  change?(
    original: unknown[],
    api: { shared: any; event: { stop(): void }; methods: { abort(): void } }
  ): void
}

export function on<Data>(store: DotXStore<Data>, handlers: Handlers)
