import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import { getProductsByCategory } from '../data/products'
import './CategoryPage.css'
import '../components/ProductGrid.css'

export default function CategoryPage({ category }) {
  const meta = {
    his: { title: 'His', description: 'Bold Arabic fragrances crafted for him.' },
    hers: { title: 'Hers', description: 'Elegant perfumes and oils for her.' },
    unisex: { title: 'Unisex', description: 'Versatile fragrances for every occasion.' },
  }[category]

  const items = getProductsByCategory(category)

  return (
    <Layout>
      <main className="category-page">
        <div className="category-hero">
          <div className="category-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Shop</span>
            <span>/</span>
            <span>{meta.title}</span>
          </div>
          <Reveal as="h1" className="category-title">
            {meta.title}
          </Reveal>
          <Reveal className="category-description">{meta.description}</Reveal>
        </div>

        <div className="category-toolbar">
          <span className="category-count">{items.length} Fragrances</span>
        </div>

        <div className="products-grid category-grid">
          {items.map((product) => (
            <Reveal key={product.id}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </main>
    </Layout>
  )
}
