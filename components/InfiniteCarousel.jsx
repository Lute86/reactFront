import React from 'react'
import '../index.css'

function InfiniteCarousel() {

  const logos = [
    {img:'src/assets/logos/js.png', alt:'JavaScript'},
    {img:'src/assets/logos/react.svg', alt:'React'},
    {img:'src/assets/logos/node.png', alt:'NodeJS'},
    {img:'src/assets/logos/css.png', alt:'CSS'},
    {img:'src/assets/logos/redux.png', alt:'Redux'},
    {img:'src/assets/logos/git.png', alt:'Git'},
    {img:'src/assets/logos/python.png', alt:'Python'},
  ]

  return (
    <div className="logos-infinite-carousel">
      <div className="logos-slide-infinite-carousel">
        {logos.map(item => <img src={item.img} alt={item.alt} />)}
      </div>
      <div className="logos-slide-infinite-carousel">
        {logos.map(item => <img src={item.img} alt={item.alt} />)}
      </div>
      <div className="logos-slide-infinite-carousel">
        {logos.map(item => <img src={item.img} alt={item.alt} />)}
      </div>
    </div>
  )
}

export default InfiniteCarousel
