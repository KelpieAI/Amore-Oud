import Reveal from './Reveal'
import './CollectionsGrid.css'

const collections = [
  {
    name: 'His',
    img: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=600&q=80',
  },
  {
    name: 'Hers',
    img: 'https://images.unsplash.com/photo-1592945403407-9caf930b0097?w=600&q=80',
  },
  {
    name: 'Unisex',
    img: 'https://images.unsplash.com/photo-1588776814546-1ffedba74520?w=600&q=80',
  },
]

export default function CollectionsGrid() {
  return (
    <section className="section" id="collections">
      <Reveal className="section-eyebrow">Shop By Collection</Reveal>
      <Reveal as="h2" className="section-title">
        Find Your <em>Signature</em> Scent
      </Reveal>
      <div className="collections-grid">
        {collections.map((col) => (
          <Reveal key={col.name} className="collection-card">
            <img src={col.img} alt={col.name} />
            <div className="collection-overlay">
              <div className="collection-tag">Collection</div>
              <div className="collection-name">{col.name}</div>
              <a href="#" className="collection-cta">
                Explore →
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
