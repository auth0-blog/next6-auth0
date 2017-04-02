import React from 'react'
import styled from 'styled-components'

import defaultPage from '../hocs/defaultPage'

const Heading = styled.h1`
  font-size: 40px;
  font-weight: 200;
  line-height: 40px;
`

const Content = styled.p`
  font-size: 20px;
  font-weight: 200;
  line-height: 30px;
`

const About = () => (
  <div>
    <Heading >Nothing to see here.</Heading>
    <Content>
      This is just a random page.
    </Content>
  </div>
)

export default defaultPage(About)
