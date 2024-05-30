import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory} from '../../store/slice/productSlice'
import { Link } from 'react-router-dom'

const CardSection = () => {

  const dispatch = useDispatch()

  // const fetchProductData = async()=>{
  //   const data = dispatch(getAllProduct())
  //   console.log(data)
  // }

  const fetchCategoryData = async()=>{
    const data = dispatch(getAllCategory())
    // console.log(data)
  }

  const categoryList = useSelector((store) => store.product.categoryList)
  

  useEffect(()=>{
    fetchCategoryData()
  },[])

  return (
    <div className=''>
    <div className="card-section">
    {
      categoryList.data && categoryList.data.map((props)=>{
        {/* console.log(props) */}
        return (
          <div key={props.category_id} className="box">
      <h1>{props.name}</h1>
      <img src={props.category_image} alt="box1" />
     <Link to='/category' state={{ category_id: props.category_id }} >
      <span>Shop now</span>
      </Link>
     
    </div>
        )
      })
    }
    {/* <div className="box">
      <h1>Health & Personal Care</h1>
      <img src={box1} alt="box1" />
      <a>Shop now</a>
    </div> */}

  </div>
  </div>
  )
}

export default CardSection