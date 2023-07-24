import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const AllVideosList = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDark} = value
      const {videosListDetails} = props
      const {
        publishedAt,
        thumbnailUrl,
        title,
        id,
        viewCount,
        channel,
      } = videosListDetails
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
          <li className="videos-container">
            <div className="video-container">
              <img className="thumbnail" src={thumbnailUrl} alt="" />
              <div className="video-desc-container">
                <img
                  className="video-profile-img"
                  src={profileImageUrl}
                  alt=""
                />
                <div className="video-title-container">
                  <h1 className={isDark ? 'title-dark' : 'title-light'}>
                    {title}
                  </h1>
                  <p
                    className={
                      isDark ? 'channel-name-dark' : 'channel-name-light'
                    }
                  >
                    {name}
                  </p>
                  <p
                    className={
                      isDark ? 'views-count-dark' : 'views-count-light'
                    }
                  >{`${viewCount} views . ${distance[1]} ${distance[2]} ago`}</p>
                </div>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default AllVideosList
