import React from 'react'

import defaultPage from '../../hocs/defaultPage'
import { authorize } from '../../utils/auth0'

class SignIn extends React.Component {
  componentDidMount () {
    authorize()
  }
  render () {
    return null
  }
}

export default defaultPage(SignIn)
