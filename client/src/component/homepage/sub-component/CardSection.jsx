import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../store/slice/productSlice';
import { Link } from 'react-router-dom';
import ShimmerCard from '../../shimmer/ShimmerCard';

const CardSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        await dispatch(getAllCategory());
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategoryData();
  }, [dispatch]);

  const categoryList = useSelector((store) => store.product.categoryList);
  const { error, data, pending } = categoryList;

  return (
    <div className='card-section'>
      {error ? (
        <div>Error fetching categories. Please try again later.</div>
      ) : pending ? (
        <ShimmerCard count={4} />
      ) : data ? (
        data.map((category) => {
          const { category_id, name, category_image } = category;
          return (
            <div key={category_id} className="box">
              <h1>{name}</h1>
              <img src={category_image} alt={`${name}`} />
              <Link to='/category' state={{ category_id }}>
                <span>Shop now</span>
              </Link>
            </div>
          );
        })
      ) : (
        <ShimmerCard count={4} />
      )}
    </div>
  );
};

export default CardSection;
