import '@testing-library/jest-dom/extend-expect'
import React, { FC } from 'react'
import ReactTesting from '@testing-library/react'
import { createStore, bind } from 'dotto.x'

import { useStore } from './index'

let { render, screen, act } = ReactTesting
let { createElement: h } = React

it('renders store', async () => {
  let renders = 0

  let user = createStore({ name: 'John' })
  let project = createStore({ name: 'dotto' })

  let Test1: FC = () => {
    renders += 1
    let uName = useStore(user, 'name')
    let pName = useStore(project, 'name')
    return h('div', { 'data-testid': 'test1' }, `${uName}-${pName}`)
  }

  render(h(Test1))
  expect(screen.getByTestId('test1')).toHaveTextContent('John-dotto')
  expect(renders).toEqual(1)

  await act(async () => {
    user.set('name', 'John Constantine')
    project.set('name', 'dotto.x')
  })

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

  let Test1: FC = () => {
    renders += 1
    let uName = useStore(userName)
    let pName = useStore(projectName)
    return h('div', { 'data-testid': 'test1' }, `${uName}-${pName}`)
  }

  render(h(Test1))
  expect(screen.getByTestId('test1')).toHaveTextContent('John-dotto')
  expect(renders).toEqual(1)

  await act(async () => {
    userName.set('John Constantine')
    projectName.set('dotto.x')
  })

  expect(screen.getByTestId('test1')).toHaveTextContent(
    'John Constantine-dotto.x'
  )
  expect(renders).toEqual(2)
})
