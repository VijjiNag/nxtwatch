import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import MenuItemsHome from '../MenuItemsHome'
import AllVideosList from '../AllVideosList'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isClosed: false,
    videosList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickSearchIcon = () => {
    const {searchInput, videosList} = this.state
    const searchResults = videosList.filter(eachVideo =>
      eachVideo.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({videosList: searchResults}, this.getVideos)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
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

  onCloseHomeBanner = () => {
    this.setState({isClosed: true})
  }

  renderHomeBannerClose = () => {
    const {isClosed} = this.state
    return (
      <div className={isClosed ? 'home-banner-none' : 'home-banner'}>
        <div className="home-banner-content-container">
          <div className="home-banner-close-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt=""
              className="logo-web-banner"
            />
            <button
              type="button"
              className="close-btn"
              onClick={this.onCloseHomeBanner}
            >
              <AiOutlineClose />
            </button>
          </div>
          <p className="home-banner-desc">
            Buy Nxt Watch Premium prepaid plans with UPI
          </p>
          <button type="button" className="get-it-now-btn">
            GET IT NOW
          </button>
        </div>
      </div>
    )
  }

  onClickSearchResultsRetryBtn = () => {
    this.getVideos()
  }

  renderVideosList = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const {videosList} = this.state
        const isVideosEmpty = videosList.length === 0
        return (
          <>
            {isVideosEmpty ? (
              <div className="empty-search-container">
                <img
                  className="empty-search-img"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                  alt=""
                />
                <h1
                  className={
                    isDark
                      ? 'no-search-results-head-dark'
                      : 'no-search-results-head-light'
                  }
                >
                  No Search results found
                </h1>
                <p className="no-search-results-desc-light">
                  Try different key words or remove search filter
                </p>
                <button
                  type="button"
                  className="retry-btn-light"
                  onClick={this.onClickSearchResultsRetryBtn}
                >
                  Retry
                </button>
              </div>
            ) : (
              <ul className="home-videos-container">
                {videosList.map(eachList => (
                  <AllVideosList
                    videosListDetails={eachList}
                    key={eachList.id}
                  />
                ))}
              </ul>
            )}
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  onClickErrorRetryBtn = () => {
    this.getVideos()
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

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosList()
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
          const {searchInput} = this.state
          return (
            <div>
              <Header />
              <div className="home-container">
                <MenuItemsHome />
                <div
                  className={
                    isDark
                      ? 'home-banner-container-dark'
                      : 'home-banner-container'
                  }
                >
                  {this.renderHomeBannerClose()}
                  <div className="search-container">
                    <div
                      className={
                        isDark ? 'input-container-dark' : 'input-container'
                      }
                    >
                      <input
                        className={
                          isDark ? 'search-input-dark' : 'search-input'
                        }
                        value={searchInput}
                        type="search"
                        placeholder="Search"
                        onChange={this.onChangeSearchInput}
                      />
                    </div>
                    <button
                      type="button"
                      className={isDark ? 'search-btn-dark' : 'search-btn'}
                      onClick={this.onClickSearchIcon}
                    >
                      <AiOutlineSearch
                        className={isDark ? 'search-icon-dark' : 'search-icon'}
                      />
                    </button>
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

export default Home
