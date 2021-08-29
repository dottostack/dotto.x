import type { DotXStore } from '../create-store'
import type { DotXAtom } from '../create-atom'

export function onGet<Data>(
  store: DotXStore<Data>,
  handler: (
    original: unknown[],
    api: { shared: any; event: { stop(): void } }
  ) => void
)

export function onGet<Data>(
  store: DotXAtom<Data>,
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

export function onSet<Data>(
  store: DotXAtom<Data>,
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

export function onChange<Data>(
  store: DotXAtom<Data>,
  handler: (
    original: unknown[],
    api: { shared: any; event: { stop(): void }; methods: { abort(): void } }
  ) => void
)

export function onCreate<Data>(
  store: DotXStore<Data>,
  handler: (original: unknown[], api: { shared: any }) => void
)

export function onCreate<Data>(
  store: DotXAtom<Data>,
  handler: (original: unknown[], api: { shared: any }) => void
)

export function onOff<Data>(
  store: DotXStore<Data>,
  handler: (original: unknown[], api: { shared: any }) => void
)

export function onOff<Data>(
  store: DotXAtom<Data>,
  handler: (original: unknown[], api: { shared: any }) => void
)
