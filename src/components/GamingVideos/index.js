import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const GamingVideos = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDark} = value
      const {gamingVideosList} = props
      const {thumbnailUrl, id, title, viewCount} = gamingVideosList
      return (
        <Link to={`/videos/${id}`} className="video-link">
          <li className="gaming-list-item">
            <img src={thumbnailUrl} className="gaming-thumbnail" alt="" />
            <div className="gaming-video-desc">
              <h1
                className={
                  isDark ? 'gaming-video-title-dark' : 'gaming-video-title'
                }
              >
                {title}
              </h1>
              <p className="gaming-views-count">
                {viewCount} Watching Worldwide
              </p>
            </div>
          </li>
        </Link>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default GamingVideos
