import React, { Component, PropTypes } from 'react'
import addons from '@kadira/storybook-addons'

const styles = {
  container: {
    display: 'table',
    margin: '1em',
    fontFamily: 'Arial',
    color: '#444',
    minWidth: 300,
  },
}

const stateDefaults = {
  enabled: true,
  menuPosition: 'top-left'
}

const nil = () => {}

export class Ruler extends Component {
  static propTypes = {
    api: PropTypes.object,
    channel: PropTypes.object,
  }

  constructor (...args) {
    super(...args)

    this.stopListeningOnStory = nil

    this.state = stateDefaults
  }

  componentDidMount () {
    const { channel, api } = this.props

    // channel.on('ruler/configure', this.configure)
    channel.on('ruler/ready', () => channel.emit('ruler/configure', this.state))

    // Reset the current config on every story change.
    this.stopListeningOnStory = api.onStory(this.reset)
  }

  // This is some cleanup tasks when the Ruler panel is unmounting.
  componentWillUnmount () {
    const { channel } = this.props

    this.stopListeningOnStory()
    channel.emit('ruler/configure', { ...this.state, enabled: false })
    channel.removeListener('ruler/ready', this.configure)
  }

  /**
   * Reset the Ruler configuration to initial.
   */
  reset = () => this.configure(stateDefaults)

  /**
   * Configure Ruler.
   * @TODO: talk to Ruler instance.
   */
  configure = config => {
    this.setState(config)
    this.props.channel.emit('ruler/configure', config)
  }

  configChange = (key, getValue) => e => this.configure({ ...this.state, [key]: getValue(e) })

  render () {
    const { enabled, menuPosition } = this.state

    return (
      <div style={ styles.container }>
        <div style={ { display: 'table-row' } }>
          <label style={ { display: 'table-cell' } }>Enabled</label>
          <input style={ { display: 'table-cell' } }
            type='checkbox'
            checked={ enabled }
            onChange={ this.configChange('enabled', e => !enabled) }
          />
        </div>

        <div style={ { display: 'table-row' } }>
          <label style={ { display: 'table-cell' } }>Menu position</label>
          <select style={ { display: 'table-cell' } }
            value={ menuPosition }
            onChange={ this.configChange('menuPosition', e => e.target.value) }
          >
            <option value='top-left'>Top-left</option>
            <option value='top-right'>Top-right</option>
            <option value='bottom-left'>Bottom-left</option>
            <option value='bottom-right'>Bottom-right</option>
          </select>
        </div>
      </div>
    )
  }
}

addons.register('ruler', api => {
  addons.addPanel('ruler/panel', {
    title: 'Ruler',
    render: () => (
      <Ruler channel={ addons.getChannel() } api={ api } />
    ),
  })
})
