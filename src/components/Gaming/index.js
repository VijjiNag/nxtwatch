import {Component} from 'react'
import Header from '../Header'
import MenuItemsGaming from '../MenuItemsGaming'
import NxtWatchContext from '../../context/NxtWatchContext'

class Gaming extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div>
              <Header />
              <div className="gaming-container">
                <MenuItemsGaming />
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Gaming
