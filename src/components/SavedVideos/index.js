import {Component} from 'react'
import Header from '../Header'
import NxtWatchContext from '../../context/NxtWatchContext'
import MenuItemsSavedVideos from '../MenuItemsSavedVideos'

class SavedVideos extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div>
              <Header />
              <div className="saved-container">
                <MenuItemsSavedVideos />
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default SavedVideos
