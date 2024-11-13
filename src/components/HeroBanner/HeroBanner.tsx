import { useEffect, useState } from 'react';
import './Herobanner.scss';

interface HeroBannerProps {
  variant?: 'first' | 'second';
}

const bannerStyles = [
    {
        style: 'style1',
        title: 'Summer Sale',
        description: 'Up to 50% off on selected items',
        buttonText: 'Shop Now',
        image: 'https://i.ebayimg.com/images/g/wRQAAOSwG-5mKWvS/s-l960.webp'
    },
    {
        style: 'style2',
        title: 'New Arrivals',
        description: 'Check out our latest collection',
        buttonText: 'Discover More',
        image: 'https://i.ebayimg.com/images/g/1mQAAOSwropmIxmj/s-l960.webp'
    },
    {
        style: 'style3',
        title: 'Special Deals',
        description: 'Limited time offers on premium products',
        buttonText: 'View Deals',
        image: 'https://i.ebayimg.com/images/g/E70AAOSwm6VmBeZD/s-l300.webp'
    },
    {
        style: 'style4',
        title: 'Flash Sale',
        description: 'Don\'t miss out on these amazing offers',
        buttonText: 'Shop Sale',
        image: 'https://i.ebayimg.com/images/g/-P8AAOSwotFmBeZF/s-l300.webp'
    }
];

const HeroBanner = ({ variant = 'first' }: HeroBannerProps) => {
    const bannerStylesSet = variant === 'first' ? bannerStyles.slice(0, 2) : bannerStyles.slice(2);
    const [currentStyle, setCurrentStyle] = useState(bannerStylesSet[0]);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * bannerStylesSet.length);
        setCurrentStyle(bannerStylesSet[randomIndex]);
    }, [bannerStylesSet]);

    return (
        <div className={`hero_banner ${currentStyle.style}`}>
            <div className="hero_banner-content">
                <h1>{currentStyle.title}</h1>
                <p>{currentStyle.description}</p>
                <button>{currentStyle.buttonText}</button>
            </div>
            <div className="hero_banner-image">
                <img src={currentStyle.image} alt={currentStyle.title} />
            </div>
        </div>
    );
};

export default HeroBanner;

