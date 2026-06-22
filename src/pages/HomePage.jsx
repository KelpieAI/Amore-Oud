import Layout from '../components/Layout'
import Hero from '../components/Hero'
import ScrollExperience from '../components/ScrollExperience'
import CollectionsGrid from '../components/CollectionsGrid'
import ProductGrid from '../components/ProductGrid'
import BrandStatement from '../components/BrandStatement'

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <ScrollExperience />
      <CollectionsGrid />
      <ProductGrid />
      <BrandStatement />
    </Layout>
  )
}
