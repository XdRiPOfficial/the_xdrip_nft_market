import React, { useState, useEffect } from "react";
import {
  BsFillAlarmFill,
  BsFillCalendarDateFill,
  BsCalendar3,
} from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


// INTERNAL IMPORT
import Style from "./Collection.module.css";
import DaysComponent from "./DaysComponents/DaysComponents";
import images from "../../img";
import { getAllUsers, getAllCollections } from "../../firebase/services";

const Collection = () => {
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const [news, setNews] = useState(false);
  const [followingData, setFollowingData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getAllUsers();
      setFollowingData(userData);
      setNewsData(userData);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCollectionData = async () => {
      const collectionData = await getAllCollections();
      setFollowingData(collectionData);
      setNewsData(collectionData);
    };

    fetchCollectionData();
  }, []);

  const openPopular = () => {
    if (!popular) {
      setPopular(true);
      setFollowing(false);
      setNews(false);
    }
  };

  const openFollower = () => {
    if (!following) {
      setPopular(false);
      setFollowing(true);
      setNews(false);
    }
  };

  const openNews = () => {
    if (!news) {
      setPopular(false);
      setFollowing(false);
      setNews(true);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000,
    arrows: true,
    useKeyboardArrows: true,
    accessibility: true,
    fade: false,
    rows: 1,
    swipe: true,
    lazyLoad: 'ondemand',
    beforeChange: (current, next) => setCurrentSlide(next + 1),
    prevArrow: <CustomPrevArrow />, // Custom previous arrow component
    nextArrow: <CustomNextArrow />, // Custom next arrow component
  };

  return (
    <div className={Style.collection}>
      <div className={Style.collection_title}>
        <div className={Style.collection_collections}>
          <div className={Style.collection_collections_btn}>
            <button onClick={() => openPopular()}>
              <BsFillAlarmFill /> DAILY
            </button>
            <button onClick={() => openFollower()}>
              <BsCalendar3 /> WEEKLY
            </button>
            <button onClick={() => openNews()}>
              <BsFillCalendarDateFill /> MONTHLY
            </button>
          </div>
        </div>
      </div>
      <div className={Style.sliderContainer}>
        <div className={Style.slider}>
          <div className={Style.slider_box}>
            <div className={Style.slider_box_button}></div>
          </div>
          <div className={Style.slider_box_items}>
            {popular && (
              <div>
                <Slider {...settings}>
                  {followingData.map((data, i) => (
                    <DaysComponent key={i + 1} data={data} />
                  ))}
                </Slider>
              </div>
            )}
            {following && (
              <div>
                <Slider {...settings}>
                  {followingData.map((data, i) => (
                    <DaysComponent key={i + 1} data={data} />
                  ))}
                </Slider>
              </div>
            )}
            {news && (
              <div>
                <Slider {...settings}>
                  {newsData.map((data, i) => (
                    <DaysComponent key={i + 1} data={data} />
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

// Custom previous arrow component
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={`${Style.customArrow} ${Style.customPrevArrow}`} onClick={onClick}>
      <Image src={images.left_arrow} alt="Previous" />
    </div>
  );
};

// Custom next arrow component
const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={`${Style.customArrow} ${Style.customNextArrow}`} onClick={onClick}>
      <Image src={images.right_arrow} alt="Next" />
    </div>
  );
};


export default Collection;
