import { useDispatch, useSelector } from "react-redux";
import { setOption, setTerm } from "../../rtk/Slices/search-slice";

function SearchBar() {
  const dispatch = useDispatch(); // to dispatch actions to the store
  const { option, term } = useSelector((state) => state.search); // get search state from Redux store


  const handleInputChange = (e) => { // update search term in Redux store
    dispatch(setTerm(e.target.value));
  };
  return (
    
    <div className="pt-16 pb-8 mt-10 container mx-auto px-4 h-full">
      <section className="flex flex-col sm:flex-row items-center gap-4 container mx-auto">
        {/* Select Box */}
        <div id="btnSearch" className="w-full sm:w-1/3">
          <select
            className="w-full sm:w-2/3 border border-gray-300 rounded px-3 py-2 h-12 text-[#007bff] font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
            id="searchOption"
            value={option}
            onChange={(e) => dispatch(setOption(e.target.value))}
          >
            <option value="searchTitle" className="text-[#007bff] font-bold">
              Search By Title
            </option>
            <option value="searchCategory" className="text-[#007bff] font-bold">
              Search By Category
            </option>
          </select>
        </div>

        {/* Input Box */}
        <input
          value={term}
          onChange={handleInputChange}
          className="w-full sm:w-2/3 border border-gray-300 rounded px-3 py-2 h-12 focus:outline-none focus:ring-2 focus:ring-[#007bff] shadow-sm transition"
          type="text"
          id="search"
          placeholder={option === "searchTitle" ? "Search By Title" : "Search By Category"}
        />
      </section>
    </div>
  );
}

export default SearchBar
