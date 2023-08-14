import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const TrendingVideoListItems = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDark} = value
      const {trendingVideosList} = props
      const {
        thumbnailUrl,
        id,
        title,
        viewCount,
        publishedAt,
        channel,
      } = trendingVideosList
      const {name, profileImageUrl} = channel
      const date = new Date(publishedAt)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const distance = formatDistanceToNow(new Date(year, month, day)).split(
        ' ',
      )
      return (
        <Link to={`/videos/${id}`} className="video-link">
          <li className="trending-list-item">
            <img src={thumbnailUrl} alt="" className="trending-thumbnail" />
            <div className="trending-video-desc">
              <div className="profile-img-container">
                <img
                  src={profileImageUrl}
                  alt=""
                  className="trending-profile-img"
                />
                <h1
                  className={
                    isDark
                      ? 'trending-video-title-dark'
                      : 'trending-video-title'
                  }
                >
                  {title}
                </h1>
              </div>
              <div className="trending-channel-container">
                <p className="trending-channel-name">{name}</p>
                <p className="trending-views-count">
                  {` ${viewCount}`} views . {distance[1]} {distance[2]} ago
                </p>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default TrendingVideoListItems
