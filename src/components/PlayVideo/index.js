import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import MenuItemsForPlayVideos from '../MenuItemsForPlayVideos'
import './index.css'

class PlayVideo extends Component {
  state = {
    playVideosDetails: {},
    isPlaying: false,
  }

  componentDidMount() {
    this.getPlayVideoItemDetails()
  }

  getPlayVideoItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
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
        channel: {
          name: fetchedData.video_details.channel.name,
          profileImageUrl: fetchedData.video_details.channel.profile_image_url,
          subscriberCount: fetchedData.video_details.channel.subscriber_count,
        },
      }
      this.setState({playVideosDetails: updatedData})
    }
  }

  renderPlayVideoItemDetails = () => {
    const {playVideosDetails, isPlaying} = this.state
    const {
      id,
      description,
      publishedAt,
      thumbnailUrl,
      title,
      videoUrl,
      viewCount,
      channel,
    } = playVideosDetails

    const date = new Date(publishedAt)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const distance = formatDistanceToNow(new Date(year, month, day)).split(' ')

    const onClickPlay = () => {
      this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
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
          <h1 className="play-video-head">{title}</h1>
          <div className="views-container">
            <p>{`${viewCount} views . `}</p>
          </div>
        </div>
      </div>
    )
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
                  {this.renderPlayVideoItemDetails()}
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
