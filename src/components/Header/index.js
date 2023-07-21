import {Component} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {FaMoon} from 'react-icons/fa'
import {BsBoxArrowRight} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiSun} from 'react-icons/fi'
import './index.css'
import NxtWatchContext from '../../context/NxtWatchContext'

const lightThemeLogoUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const darkThemeLogoUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

class Header extends Component {
  renderNavBarItems = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {onChangeTheme, isDark} = value

        const onClickTheme = () => {
          onChangeTheme()
        }

        return (
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
              <button type="button" className="menu-btn-mobile">
                <GiHamburgerMenu
                  className={isDark ? 'menu-icon-dark' : 'menu-icon-light'}
                />
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
                  className={isDark ? 'logout-icon-dark' : 'logout-icon-light'}
                />
              </button>
            </div>
          </nav>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    return <div>{this.renderNavBarItems()}</div>
  }
}

export default Header
