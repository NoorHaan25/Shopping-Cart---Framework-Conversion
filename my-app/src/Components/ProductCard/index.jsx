import { useEffect, useState } from "react";
// import { IoHeartOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../rtk/Slices/products-slice";
import { addToCart, deleteFromCart } from "../../rtk/Slices/cart-slice";
import { addToFavorites, removeFromFavorites } from "../../rtk/Slices/favorites.slice";
import Pagination from "../Pagination";
function ProductCard() {
  const [currentPage, setCurrentPage] = useState(1)
  const { items, status, error } = useSelector((state) => state.products); // get products state from Redux store
  // console.log('productsDispatch', products);
  const cart = useSelector((state) => state.cart); // get cart items from Redux store
  const favorites = useSelector((state) => state.favorites); // get favorites from Redux store
  const { option, term } = useSelector((state) => state.search); // get search state from Redux store
  console.log('favorites', favorites);

  // console.log('cart', cart.length);
  const dispatch = useDispatch();
  const isInCart = (id) => cart.some((product) => product.id === id);// check if product is in cart
  const isFavorite = (id) => favorites.some((fav) => fav.id === id); // check if product is in favorites
  // Filter products based on search term and option
  const filtered = items.filter((p) => {
    if (term.trim() === "") return true;
    if (option === "searchTitle") {
      return p.title.toLowerCase().includes(term.toLowerCase());
    } else if (option === "searchCategory") {
      return p.category.toLowerCase().includes(term.toLowerCase());
    }
    return true;
  });
  const product_for_page = 10;
  const pages = Math.floor(filtered.length / product_for_page)
  const startIndex = (currentPage - 1) * product_for_page
  const endIndex = currentPage * product_for_page
  const orderProducts = filtered.slice(startIndex, endIndex)
  console.log('orderProducts', orderProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  if (status === "loading")
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-blue-600 font-medium">Loading...</span>
      </div>
    );

  if (status === "failed")
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-600 font-semibold bg-red-100 px-4 py-2 rounded-md shadow-sm">
          Error: {error}
        </p>
      </div>
    );
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {orderProducts.map((item, index) => (
            <div key={`${item.id}-${index}`} className="p-4">
              <div className="card border border-sky-500 rounded-lg shadow-sm py-3 transition-transform duration-300 hover:scale-105">
                {/* Product Image */}
                <img
                  className="product-item-img rounded-md m-auto object-contain"
                  src={item.image_url}
                  alt={item.title}
                  style={{ width: "80%", height: "200px" }}
                />

                {/* Product Info */}
                <div className="product-item-desc px-4 pb-0 mt-2 space-y-1">
                  <p className="font-semibold">Product: {item.title}</p>
                  <p>Category: {item.category}</p>
                  <p>Color: {item.color}</p>
                  <p className="card-price">
                    <span>
                      <del className="text-gray-400">{item.price} EGP</del>
                      <span className="font-bold text-emerald-600">
                        {item.sale_price}EGP
                      </span>
                    </span>
                  </p>
                </div>

                {/* Product Actions */}
                <div className="product-item-action flex items-center justify-between px-4 mt-3">
                  <button
                    onClick={() =>
                      isInCart(item.id)
                        ? dispatch(deleteFromCart(item))
                        : dispatch(addToCart(item))
                    }
                    className={`px-3 py-1 rounded-md text-sm text-white ${isInCart(item.id)
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                      } cursor-pointer transition-colors duration-300`}
                  >
                    {isInCart(item.id) ? "Remove From Cart" : "Add To Cart"}
                  </button>
                  <FaHeart
                    className={`text-2xl cursor-pointer transition-colors duration-300 ${isFavorite(item.id) ? "text-[#007bff]" : "text-[#ebe6e7]"
                      }`}
                    onClick={() =>
                      isFavorite(item.id)
                        ? dispatch(removeFromFavorites(item))
                        : dispatch(addToFavorites(item))
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination pages={pages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </>
  );
}

export default ProductCard
