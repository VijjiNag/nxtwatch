import {Component} from 'react'
import Header from '../Header'
import MenuItemsTrending from '../MenuItemsTrending'
import NxtWatchContext from '../../context/NxtWatchContext'

class TrendingVideos extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div>
              <Header />
              <div className="trending-container">
                <MenuItemsTrending />
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default TrendingVideos
