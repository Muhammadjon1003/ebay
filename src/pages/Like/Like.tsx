import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import Product from '../../components/Product/Product'
import './Like.scss'
const Like = () => {
const LikedProducts = useSelector((state: RootState) => state.like.likedProducts)
  return (
    <div className="like">
      <h1 className="like_title">Your Liked Products</h1>
     <div className="like_content">
     {
       LikedProducts.map((product) => <Product key={product.id} {...product} />)
      }
     </div>
    </div>
  )
}

export default Like
