import CustomCursor from './CustomCursor'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <CustomCursor />
      <Nav />
      {children}
      <Footer />
    </>
  )
}
