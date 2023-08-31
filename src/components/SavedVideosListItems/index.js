import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const SavedVideosListItems = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDark} = value
      const {savedVideosList} = props
      const {
        id,
        description,
        publishedAt,
        thumbnailUrl,
        title,
        videoUrl,
        viewCount,
        channel,
      } = savedVideosList
      const {name} = channel
      const date = new Date(publishedAt)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const distance = formatDistanceToNow(new Date(year, month, day)).split(
        ' ',
      )
      return (
        <Link className="video-link" to={`/videos/${id}`}>
          <li className="saved-video">
            <img className="saved-video-thumbnail" src={thumbnailUrl} alt="" />
            <div className="saved-video-desc-container">
              <h1 className="saved-video-head">{title}</h1>
              <p className="saved-video-channel-name">{name}</p>
              <p className="saved-video-view-count">
                {viewCount} views . {`${distance[1]} ${distance[2]} ago`}
              </p>
            </div>
          </li>
        </Link>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SavedVideosListItems
