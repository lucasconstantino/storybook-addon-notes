import React from 'react'
import addons from '@kadira/storybook-addons'

import Ruler from 'ruler-guides'

const sides = ['top', 'right', 'bottom', 'left']

export const ruler = opt => Decorated => {
  const channel = addons.getChannel()
  const ruler = Ruler()

  let body, root, menuButton, menu

  // Register elements ruler is built.
  setTimeout(() => {
    body = document.body
    root = document.querySelector('#root')
    menu = document.querySelector('.rg-menu')
    menuButton = document.querySelector('.menu-btn.unselectable')

    // Initial DOM setup.
    menu.style.listStyle = 'none'

    channel.emit('ruler/ready')
  }, 15)

  channel.on('ruler/configure', ({ enabled, menuPosition }) => {
    // Update Ruler status.
    ruler[enabled ? 'enable' : 'disable']()

    body.style.background = enabled ? '#CCCCCC' : ''
    body.style.height = enabled ? '100vh' : ''
    root.style.background = enabled ? 'white' : ''
    root.style.position = enabled ? 'fixed' : ''
    root.style.top = enabled ? '32px' : ''
    root.style.left = enabled ? '42px' : ''
    root.style.right = enabled ? 0 : ''
    root.style.bottom = enabled ? 0 : ''
    // root.style.padding:
    root.style.transform = enabled ? 'translate3d(0, 0, 0)' : ''

    // Update menu position.
    sides.forEach(side => {
      menu.style[side] = menuPosition.includes(side) ? '20px' : 'auto'
      menuButton.style[side] = menuPosition.includes(side) ? '5px' : 'auto'
    })
  })

  return <Decorated />
}
