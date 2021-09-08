import '@testing-library/jest-dom/extend-expect'
import { createStore, bind } from 'dotto.x'
import VueTesting from '@testing-library/vue'
import Vue from 'vue'

import { useStore } from './index'

let { render, screen } = VueTesting
let { defineComponent, h, nextTick, ref } = Vue

it('renders store', async () => {
  let renders = 0

  let user = createStore({ name: 'John' })
  let project = createStore({ name: 'dotto' })

  let Test1 = defineComponent(() => {
    let userStore = useStore(user, 'name')
    let projectStore = useStore(project, 'name')

    return () => {
      renders += 1
      return h('div', {
        'data-testid': 'test1'
      }, `${userStore.value}-${projectStore.value}`)
    }
  })

  render(h(Test1))
  expect(screen.getByTestId('test1')).toHaveTextContent('John-dotto')
  expect(renders).toEqual(1)

  user.set('name', 'John Constantine')
  project.set('name', 'dotto.x')
  await nextTick()

  expect(screen.getByTestId('test1')).toHaveTextContent(
    'John Constantine-dotto.x'
  )
  expect(renders).toEqual(2)
})

it('renders computed', async () => {
  let renders = 0

  let user = createStore({ name: 'John' })
  let project = createStore({ name: 'dotto' })
  let userName = bind(user, 'name')
  let projectName = bind(project, 'name')

  let Test1 = defineComponent(() => {
    let userStore = useStore(userName)
    let projectStore = useStore(projectName)
    return () => {
      renders += 1
      return h('div', {
        'data-testid': 'test1'
      }, `${userStore.value}-${projectStore.value}`)
    }
  })

  render(h(Test1))
  expect(screen.getByTestId('test1')).toHaveTextContent('John-dotto')
  expect(renders).toEqual(1)

  userName.set('John Constantine')
  projectName.set('dotto.x')
  await nextTick()

  expect(screen.getByTestId('test1')).toHaveTextContent(
    'John Constantine-dotto.x'
  )
  expect(renders).toEqual(2)
})

it('rerender on selector changes', async () => {
  let renders = 0

  let user = createStore({ name: 'John', age: '50' })

  let Test1 = defineComponent(() => {
    let userSelector = ref('name')
    let userStore = useStore(user, userSelector)

    return () => {
      renders += 1
      return h('div', {
        'data-testid': 'test1',
        onClick: () => {
          userSelector.value = 'age'
        }
      }, `${userStore.value}`)
    }
  })

  render(h(Test1))
  expect(screen.getByTestId('test1')).toHaveTextContent('John')
  expect(renders).toEqual(1)

  screen.getByTestId('test1').click()
  await nextTick()

  expect(screen.getByTestId('test1')).toHaveTextContent('50')
  expect(renders).toEqual(2)
})
