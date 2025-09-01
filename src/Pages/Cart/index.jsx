import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { decrementQuantity, deleteFromCart, incrementQuantity } from '../../rtk/Slices/cart-slice';

function Cart() {
  const cart = useSelector((state) => state.cart); // get cart items from Redux store
  const dispatch = useDispatch(); // to dispatch actions to the store
  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.sale_price * item.quantity, 0);
  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 hover:underline">Go Shopping</Link>
      </div>
    );
  }

  return (
   <div className="container mx-auto px-4 py-32">
  <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

  <div className="flex flex-col gap-4">
    {cart.map((item) => (
      <div
        key={item.id}
        className="flex flex-col md:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md gap-4"
      >
        {/* Left (Image + Title) */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
          />
          <div>
            <h2 className="font-semibold text-base sm:text-lg">{item.title}</h2>
            <p className="text-gray-500 text-sm sm:text-base">
              {item.sale_price}
              <span className="text-green-500"> EGP</span>
            </p>
          </div>
        </div>

        {/* Right (Actions) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(decrementQuantity(item.id))}
              className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
            >
              -
            </button>
            <span className="w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => dispatch(incrementQuantity(item.id))}
              className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
            >
              +
            </button>
          </div>

          <span className="font-bold text-sm sm:text-base">
            {item.sale_price * item.quantity}
            <span className="text-green-500"> EGP</span>
          </span>

          <button
            onClick={() => dispatch(deleteFromCart(item))}
            className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md shadow hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Total */}
  <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
    <span className="text-xl font-bold">Total:</span>
    <span className="text-2xl font-bold text-green-600">
      {totalPrice.toFixed(2)}
      <span className="text-green-500"> EGP</span>
    </span>
  </div>
</div>
  );
}

export default Cart