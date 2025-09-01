function Pagination({ pages, setCurrentPage, currentPage }) {
  // console.log(pages);
  const generatedPages = [];
  for (let i = 0; i <= pages; i++) { 
    generatedPages.push(i + 1);
  }

  const clickHandler = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex justify-center mt-6">
      <ul className="flex gap-2">
        {generatedPages.map((pageNum) => (
          <li
            key={pageNum}
            onClick={() => clickHandler(pageNum)}
            className={`px-4 py-2 border rounded-md cursor-pointer transition 
            ${
              currentPage === pageNum
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {pageNum}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
