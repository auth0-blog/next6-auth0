import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import styled from 'styled-components';

import ForkThis from '../components/ForkThis'
import Header from '../components/Header'
import { getUserFromServerCookie, getUserFromLocalCookie } from '../utils/auth'

const App = styled.div`
  height: 100vh;
  width: 100vw;
`

const Main = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 30px;
`

export default Page => class DefaultPage extends React.Component {
  static getInitialProps(ctx) {
    const loggedUser = process.browser ? getUserFromLocalCookie() : getUserFromServerCookie(ctx.req)
    const pageProps = Page.getInitialProps && Page.getInitialProps(ctx)
    return {
      ...pageProps,
      loggedUser,
      currentUrl: ctx.pathname,
      isAuthenticated: !!loggedUser
    }
  }

  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout(eve) {
    if (eve.key === 'logout') {
      Router.push(`/?logout=${eve.newValue}`)
    }
  }

  componentDidMount() {
    window.addEventListener('storage', this.logout, false)
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.logout, false)
  }

  render() {
    const cssFiles = [
      'https://unpkg.com/normalize.css@5.0.0/normalize.css'
    ]
    return (
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {cssFiles.map((c, i) => <link key={i} href={c} rel='stylesheet' />)}
          <style>
            {`
            * {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            }
            a {
              cursor: pointer;
            }
            `}
          </style>
          <title>Next.js + auth0</title>
        </Head>
        <ForkThis />
        <App>
          <Main>
            <Header {...this.props} />
            <Page {...this.props} />
          </Main>
        </App>
      </div>
    )
  }
}
