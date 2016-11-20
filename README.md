# Storybook Addon Ruler

This [Storybook](https://getstorybook.io) addon creates a ruler based on [RulersGuides.js](https://github.com/mark-rolich/RulersGuides.js).

### Getting Started
**note: addons require @kadira/storybook 2.x or greater*

```sh
npm i --save @kadira/storybook-addon-ruler
```

Then create a file called `addons.js` in your storybook config.

Add following content to it:

```js
import '@kadira/storybook/addons';
import 'storybook-addon-ruler/register';
```

Then write your stories like this:

```js
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { ruler } from '../'

storiesOf('Button')
  .addDecorator(ruler({}))
  .add('sample', () => (
    <button>Click me</button>
  ))
```
