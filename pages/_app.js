import App, { Container } from 'next/app'
import Settings from 'config'

export default class MyApp extends App {
  constructor(...args) {
    super(...args)
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <Container>
        <Component {...pageProps} userAgent={pageProps.userAgent} {...router} />
      </Container>
    )
  }
}
