import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import MenuItemsForPlayVideos from '../MenuItemsForPlayVideos'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PlayVideo extends Component {
  state = {
    playVideosDetails: {},
    channel: {},
    timeDistance: [],
    isPlaying: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPlayVideoItemDetails()
  }

  getPlayVideoItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.video_details.id,
        description: fetchedData.video_details.description,
        publishedAt: fetchedData.video_details.published_at,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        title: fetchedData.video_details.title,
        videoUrl: fetchedData.video_details.video_url,
        viewCount: fetchedData.video_details.view_count,
        isSaved: false,
        channel: {
          name: fetchedData.video_details.channel.name,
          profileImageUrl: fetchedData.video_details.channel.profile_image_url,
          subscriberCount: fetchedData.video_details.channel.subscriber_count,
        },
      }
      const date = new Date(updatedData.publishedAt)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const distance = formatDistanceToNow(new Date(year, month, day)).split(
        ' ',
      )
      this.setState({
        playVideosDetails: updatedData,
        timeDistance: distance,
        channel: updatedData.channel,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
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

  renderPlayVideoItemDetails = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {
          isDark,
          onSaveButton,
          onLikeBtn,
          isLiked,
          isDisLiked,
          onDisLikeBtn,
          savedVideosList,
          onSavedButton,
        } = value
        const {
          playVideosDetails,
          timeDistance,
          isPlaying,
          channel,
          isSaved,
        } = this.state
        const {
          id,
          description,
          thumbnailUrl,
          title,
          videoUrl,
          viewCount,
        } = playVideosDetails

        const isPresent = savedVideosList.find(
          each => each.id === playVideosDetails.id,
        )

        console.log(savedVideosList)

        const onClickPlay = () => {
          this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
        }

        const onClickLikeButton = () => {
          onLikeBtn(id)
        }

        const onCLickDislikeButton = () => {
          onDisLikeBtn(id)
        }

        const onClickSavedButton = () => {
          onSavedButton(id)
        }

        const onClickSaveButton = () => {
          onSaveButton({...playVideosDetails, isSaved})
        }

        return (
          <div className="video-container">
            <div className="video-responsive-container">
              <ReactPlayer
                url={videoUrl}
                playing={isPlaying}
                onClick={onClickPlay}
                className="video"
              />
              <h1
                className={isDark ? 'play-video-head-dark' : 'play-video-head'}
              >
                {title}
              </h1>
              <div className="views-container">
                <div>
                  <p className="views-text">{`${viewCount} views . ${timeDistance[1]} ${timeDistance[2]} ago`}</p>
                </div>
                <div className="likes-container">
                  <button
                    type="button"
                    className="like-btn"
                    onClick={onClickLikeButton}
                  >
                    {isLiked ? (
                      <AiFillLike className="like-icon-active" />
                    ) : (
                      <AiOutlineLike className="like-icon" />
                    )}
                    <p className={isLiked ? 'like-text-active' : 'like-text'}>
                      Like
                    </p>
                  </button>
                  <button
                    type="button"
                    className="like-btn"
                    onClick={onCLickDislikeButton}
                  >
                    {isDisLiked ? (
                      <AiFillDislike className="like-icon-active" />
                    ) : (
                      <AiOutlineDislike className="like-icon" />
                    )}
                    <p
                      className={isDisLiked ? 'like-text-active' : 'like-text'}
                    >
                      Dislike
                    </p>
                  </button>
                  {isPresent === undefined ? (
                    <button
                      type="button"
                      className="like-btn"
                      onClick={onClickSaveButton}
                    >
                      <BiListPlus className="like-icon" />
                      <p className="like-text">Save</p>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="like-btn"
                      onClick={onClickSavedButton}
                    >
                      <BiListPlus className="like-icon-active" />
                      <p className="like-text-active">Saved</p>
                    </button>
                  )}
                </div>
              </div>
              <div className="hr-container">
                <hr className="hr-line" />
              </div>
              <div className="video-desc-container">
                <img
                  src={channel.profileImageUrl}
                  alt=""
                  className="video-profile-image"
                />
                <div className="channel-name-container">
                  <p
                    className={
                      isDark ? 'video-channel-name-dark' : 'video-channel-name'
                    }
                  >
                    {channel.name}
                  </p>
                  <p className="subscriber-count">
                    {channel.subscriberCount} subscribers
                  </p>
                </div>
              </div>
              <p className={isDark ? 'desc-dark' : 'desc'}>{description}</p>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderFailureView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const onClickErrorRetryBtn = () => {
          this.getPlayVideoItemDetails()
        }
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
              onClick={onClickErrorRetryBtn}
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
        return this.renderPlayVideoItemDetails()
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
              <div className="play-videos-container">
                <MenuItemsForPlayVideos />
                <div
                  className={
                    isDark ? 'play-container-dark' : 'play-container-light'
                  }
                >
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
export default PlayVideo
