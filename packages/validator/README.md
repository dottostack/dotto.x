# dotto.x/validator

### Validate all write operation with minimalistic interface

```ts
import { createStore } from 'dotto.x'
import { validator } from '@dotto.x/validator'

let testingStore = createStore({ test: 1 })

let { errors, destroy, valid } = validator(testingStore, [
  {
    path: 'test',
    validators: [value => (value > 1 ? 'too much' : false)]
  }
])

valid.subscribe(isValid => {})
errors.subscribe({test} => {})
```
