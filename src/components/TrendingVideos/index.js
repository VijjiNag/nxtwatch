import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import MenuItemsTrending from '../MenuItemsTrending'
import TrendingVideoListItems from '../TrendingVideoListItems'
import NxtWatchContext from '../../context/NxtWatchContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingVideos extends Component {
  state = {
    trendingVideosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(eachList => ({
        id: eachList.id,
        publishedAt: eachList.published_at,
        thumbnailUrl: eachList.thumbnail_url,
        title: eachList.title,
        viewCount: eachList.view_count,
        channel: {
          name: eachList.channel.name,
          profileImageUrl: eachList.channel.profile_image_url,
        },
        total: fetchedData.total,
      }))
      this.setState({
        trendingVideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <div className="failure-img-container">
            <img
              className="failure-img"
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt=""
            />
            <h1 className={isDark ? 'error-head-dark' : 'error-head-light'}>
              Oops! Something Went Wrong
            </h1>
            <p className="error-desc">
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              type="button"
              className="retry-btn-light"
              onClick={this.onClickErrorRetryBtn}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderTrendingVideos = () => {
    const {trendingVideosList} = this.state
    return (
      <>
        <ul className="trending-videos-list-container">
          {trendingVideosList.map(eachList => (
            <TrendingVideoListItems
              trendingVideosList={eachList}
              key={eachList.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <div className="loader-container" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={isDark ? '#ffffff' : '#00306e'}
              height="50"
              width="50"
            />
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideos()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div>
              <Header />
              <div className="home-container">
                <MenuItemsTrending />
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
                          Trending
                        </h1>
                      </div>
                    </div>
                  </div>
                  {this.renderApiStatusView()}
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default TrendingVideos
