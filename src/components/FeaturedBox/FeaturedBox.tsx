import './FeaturedBox.scss'
interface FeaturedBoxProps {
    ebay_logo: string;
    title: string;
    description: string;
    button_title: string;
    box_image: string;
  }
const FeaturedBox: React.FC<FeaturedBoxProps> = ({ebay_logo, title, description, button_title, box_image}) => {
  return (
    <div className="featured__box">
      <div className="featured__box-content">
        <h6>Featured</h6>
        <img src={ebay_logo} alt="ebay logo" />
        <h2>{title}</h2>
        <p>{description}</p>
       <div className="button-container">
        <span> {button_title}</span>
       <button>
       {button_title}
        </button>
       </div>
      </div>
      <div className="featured__box-image">
      <img src={box_image} alt="" />
      </div>
    </div>
  )
}

export default FeaturedBox
