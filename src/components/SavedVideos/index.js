import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import NxtWatchContext from '../../context/NxtWatchContext'
import SavedVideosListItems from '../SavedVideosListItems'
import MenuItemsSavedVideos from '../MenuItemsSavedVideos'
import './index.css'

class SavedVideos extends Component {
  renderNoVideosFound = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <div className="no-saved-videos-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              className="no-saved-img"
              alt=""
            />
            <h1 className={isDark ? 'no-saved-head-dark' : 'no-saved-head'}>
              {' '}
              No saved videos found{' '}
            </h1>
            <p className="no-saved-desc">
              {' '}
              You can save your videos while watching them{' '}
            </p>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderSavedVideos = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark, savedVideosList} = value
        const isEmpty = savedVideosList.length === 0
        return (
          <>
            {isEmpty ? (
              this.renderNoVideosFound()
            ) : (
              <ul className="saved-videos-list-container">
                {savedVideosList.map(each => (
                  <SavedVideosListItems savedVideosList={each} key={each.id} />
                ))}
              </ul>
            )}
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div>
              <Header />
              <div className="home-container">
                <MenuItemsSavedVideos />
                <div
                  className={
                    isDark
                      ? 'trending-home-container-dark'
                      : 'trending-home-container'
                  }
                >
                  <div
                    className={
                      isDark
                        ? 'trending-head-bg-container-dark'
                        : 'trending-head-bg-container'
                    }
                  >
                    <div className="trending-head-container">
                      <div
                        className={
                          isDark
                            ? 'trending-logo-container-dark'
                            : 'trending-logo-container'
                        }
                      >
                        <HiFire className="trending-logo" />
                      </div>
                      <div>
                        <h1
                          className={
                            isDark ? 'trending-head-dark' : 'trending-head'
                          }
                        >
                          Saved Videos
                        </h1>
                      </div>
                    </div>
                  </div>
                  {this.renderSavedVideos()}
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default SavedVideos
