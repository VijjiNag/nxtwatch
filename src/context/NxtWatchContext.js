import React from 'react'

const NxtWatchContext = React.createContext({
  savedVideosList: [],
  onChangeTheme: () => {},
  onSaveButton: () => {},
  onLikeBtn: () => {},
  onDisLikeBtn: () => {},
  onSavedButton: () => {},
})

export default NxtWatchContext
