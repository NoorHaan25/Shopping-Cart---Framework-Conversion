import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites } from "../../rtk/Slices/favorites.slice";

function Favorites() {
    const favorites = useSelector((state) => state.favorites); // get favorites from Redux store
    const dispatch = useDispatch(); // to dispatch actions to the store
  return (
    <div className="container mx-auto px-4 py-32 h-full">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="flex justify-center items-center h-64 ">
          <p className="text-gray-600 text-[18px] ">No favorite products yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-sky-500 rounded-lg shadow-sm transition-transform duration-300 hover:scale-105"
            >
              {/* Product Image */}
              <img
                src={item.image_url}
                alt={item.title}
                className="rounded-md m-auto object-contain"
                style={{ width: "80%", height: "200px" }}
              />

              {/* Product Info */}
              <div className="mt-3 space-y-1">
                <p className="font-semibold">{item.title}</p>
                <p className="card-price">
                  Price:
                  <span>
                    <del className="text-gray-400">{item.price} EGP</del>{" "}
                    <span className="font-bold text-emerald-600">
                      {item.sale_price} <span className="text-green-500"> EGP</span>
                    </span>
                  </span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end mt-3">
                <button
                  className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-300 cursor-pointer"
                   onClick={() => dispatch(removeFromFavorites(item))}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;



