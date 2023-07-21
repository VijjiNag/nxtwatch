import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {HiFire} from 'react-icons/hi'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

class MenuItemsVideo extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div
              className={
                isDark ? 'side-bar-container-dark' : 'side-bar-container'
              }
            >
              <ul className="menu-items-container">
                <li className="menu-item">
                  <Link to="/" className="menu-item-link">
                    <AiFillHome className="menu-items-icon" />
                    <p
                      className={
                        isDark ? 'menu-text-dark' : 'menu-text-active-light'
                      }
                    >
                      Home
                    </p>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/trending" className="menu-item-link">
                    <HiFire className="menu-items-icon" />
                    <p
                      className={
                        isDark ? 'menu-text-dark' : 'menu-text-active-light'
                      }
                    >
                      Trending
                    </p>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/gaming" className="menu-item-link">
                    <SiYoutubegaming className="menu-items-icon" />
                    <p
                      className={
                        isDark ? 'menu-text-dark' : 'menu-text-active-light'
                      }
                    >
                      Gaming
                    </p>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/saved-videos" className="menu-item-link">
                    <BiListPlus className="menu-items-icon" />
                    <p
                      className={
                        isDark ? 'menu-text-dark' : 'menu-text-active-light'
                      }
                    >
                      Saved videos
                    </p>
                  </Link>
                </li>
              </ul>
              <div className="contact-container">
                <h1 className={isDark ? 'contact-head-dark' : 'contact-head'}>
                  CONTACT US
                </h1>
                <div className="social-icons-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="social-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="social-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="social-icon"
                  />
                </div>
                <p className={isDark ? 'contact-desc-dark' : 'contact-desc'}>
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default MenuItemsVideo
