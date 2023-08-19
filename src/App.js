import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import TrendingVideos from './components/TrendingVideos'
import Gaming from './components/Gaming'
import NxtWatchContext from './context/NxtWatchContext'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import SavedVideos from './components/SavedVideos'
import PlayVideo from './components/PlayVideo'

class App extends Component {
  state = {
    savedVideosList: [],
    isDark: false,
    isLiked: false,
    isDisLiked: false,
  }

  onChangeTheme = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  onSavedButton = id => {
    const {savedVideosList} = this.state
    const updatedVideosList = savedVideosList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({savedVideosList: updatedVideosList})
  }

  onSaveButton = savedVideo => {
    const {savedVideosList} = this.state
    const videoObject = savedVideosList.find(
      eachSavedItem => eachSavedItem.id === savedVideo.id,
    )

    if (videoObject) {
      this.setState(prevState => ({
        savedVideosList: prevState.savedVideosList.map(eachList => {
          if (videoObject.id === eachList.id) {
            return {
              ...eachList,
            }
          }
          return eachList
        }),
      }))
    } else {
      const updatedVideosList = [...savedVideosList, savedVideo]
      this.setState({
        savedVideosList: updatedVideosList,
      })
    }
  }

  onDisLikeBtn = () => {
    this.setState({isDisLiked: true, isLiked: false})
  }

  onLikeBtn = () => {
    this.setState({isLiked: true, isDisLiked: false})
  }

  render() {
    const {isDark, savedVideosList, isLiked, isDisLiked} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          savedVideosList,
          isDark,
          isLiked,
          isDisLiked,
          onChangeTheme: this.onChangeTheme,
          onSaveButton: this.onSaveButton,
          onLikeBtn: this.onLikeBtn,
          onDisLikeBtn: this.onDisLikeBtn,
          onSavedButton: this.onSavedButton,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={TrendingVideos} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={PlayVideo} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
