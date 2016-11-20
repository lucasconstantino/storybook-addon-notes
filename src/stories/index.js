import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { ruler } from '../'

storiesOf('Ruler')
  .addDecorator(ruler({}))
  .add('sample', () => (
    <p>Teste</p>
  ))
