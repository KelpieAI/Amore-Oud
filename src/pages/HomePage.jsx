import CustomCursor from '../components/CustomCursor'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import ScrollExperience from '../components/ScrollExperience'
import CollectionsGrid from '../components/CollectionsGrid'
import ProductGrid from '../components/ProductGrid'
import BrandStatement from '../components/BrandStatement'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <Hero />
      <ScrollExperience />
      <CollectionsGrid />
      <ProductGrid />
      <BrandStatement />
      <Footer />
    </>
  )
}
