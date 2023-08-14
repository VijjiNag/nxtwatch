import {Component} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {FaMoon} from 'react-icons/fa'
import {HiFire} from 'react-icons/hi'
import {AiOutlineClose, AiFillHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {BsBoxArrowRight} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiSun} from 'react-icons/fi'
import './index.css'
import MenuItemsForPlayVideos from '../MenuItemsForPlayVideos'
import NxtWatchContext from '../../context/NxtWatchContext'

const lightThemeLogoUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const darkThemeLogoUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

class Header extends Component {
  state = {
    isClickedOnHamburger: false,
  }

  renderNavBarItems = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {onChangeTheme, isDark} = value
        const {isClickedOnHamburger} = this.state

        const onClickTheme = () => {
          onChangeTheme()
        }

        const onClickHamburgerMenu = () => {
          this.setState(prevState => ({
            isClickedOnHamburger: !prevState.isClickedOnHamburger,
          }))
        }

        return (
          <>
            <nav
              className={isDark ? 'nav-container-dark' : 'nav-container-light'}
            >
              <div className="nav-links-list-container">
                <button type="button" className="logo-btn">
                  <Link className="logo-link" to="/">
                    <img
                      className="web-logo"
                      src={isDark ? darkThemeLogoUrl : lightThemeLogoUrl}
                      alt="logo"
                    />
                  </Link>
                </button>
              </div>
              <div className="nav-links-container">
                <button
                  type="button"
                  className="theme-btn"
                  onClick={onClickTheme}
                >
                  {isDark ? (
                    <FiSun className="theme-icon-dark" />
                  ) : (
                    <FaMoon className="theme-icon" />
                  )}
                </button>
                <button
                  type="button"
                  className="menu-btn-mobile"
                  onClick={onClickHamburgerMenu}
                >
                  {isClickedOnHamburger ? (
                    <AiOutlineClose
                      className={isDark ? 'menu-icon-dark' : 'menu-icon-light'}
                    />
                  ) : (
                    <GiHamburgerMenu
                      className={isDark ? 'menu-icon-dark' : 'menu-icon-light'}
                    />
                  )}
                </button>
                <button type="button" className="profile-btn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-img"
                  />
                </button>
                <button
                  type="button"
                  className={isDark ? 'logout-btn-dark' : 'logout-btn-light'}
                >
                  Logout
                </button>
                <button type="button" className="logout-btn-mobile">
                  <BsBoxArrowRight
                    className={
                      isDark ? 'logout-icon-dark' : 'logout-icon-light'
                    }
                  />
                </button>
              </div>
            </nav>
            <div
              className={
                isClickedOnHamburger
                  ? 'menu-container-mobile-open'
                  : 'menu-container-mobile-close'
              }
            >
              <div
                className={
                  isDark
                    ? 'menu-container-mobile-dark'
                    : 'menu-container-mobile-light'
                }
              >
                <ul className="menu-list-container-mobile">
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
              </div>
            </div>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    return <div>{this.renderNavBarItems()}</div>
  }
}

export default Header
