import { Acordion } from "../AcordeonMenu/AcordeonMenu"
import { useFetch } from "../../hooks/apiConsult"
import "../ProductList/ProductList.css"
import { useState } from "react"
import { Pagination } from "flowbite-react"
import ModalImageProduct from "../ModalImageProduct/ModalImageProduct"


export function ProductList({ url }) {

  let endUrl = 'products/'
  let { data, isPending, error } = useFetch(url + endUrl)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null)
  const [selectedColor, setSelectedColor] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ image: "", description: "", name: "" });

  const handleSubcategory = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId)
    setCurrentPage(1)  
  }

  const handleColorChange = (productId, color) => {
    setSelectedColor(prevColor => ({
      ...prevColor,
      [productId]: color
    }))
  }

 
  const filteredProducts = selectedSubcategoryId
    ? data?.filter((product) => product.subcategory === selectedSubcategoryId && product.stock > 0)
    : data?.filter((product)=> product.stock > 0);


  const groupedProducts = filteredProducts?.reduce((acc, product) => {
    if (!acc[product.name]) {
      acc[product.name] = []
    }
    
    acc[product.name].push(product) 
    return acc
  }, {})

  const handleClickImage = (image, description, name) => {
    setModalContent({ image, description, name });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const groupedProductsArray = Object.values(groupedProducts || {})
  const totalProducts = groupedProductsArray.length
  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  const paginatedProducts = groupedProductsArray.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <>
      <div className="product-list-container">
        <Acordion url={url} onSubcategoryClick={handleSubcategory} />
        <div className="product-content">
          <div className="mx-auto max-w-2xl px-4 py-8 sm:px-8 sm:py-12 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Productos</h2>

            {isPending && <div>Loading...</div>}
            {error && <div>Error</div>}

            {paginatedProducts.length > 0 && (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {paginatedProducts.map(group => {
                  
                  const firstProduct = group[0]
                  const selectedProductColor = selectedColor[firstProduct.id]
                  const selectedProduct = group.find(p => p.color.name === selectedProductColor) || firstProduct

                  return (
                    <div key={selectedProduct.id} className="group">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7" >
                        <img
                          src={selectedProduct.image || '/path/to/placeholder.jpg'}  // Use a placeholder image if none exists
                          alt={selectedProduct.name}
                          className="h-full w-full object-center group-hover:opacity-85"
                          style={{ height: 350, objectFit: "contain" }}
                          onClick={() => handleClickImage(selectedProduct.image, selectedProduct.description, selectedProduct.name)}
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">{selectedProduct.name}</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900 price">C${selectedProduct.sale_price}</p>
                      <div className="color-options">
                        {group.map(productVariant => (
                          <button
                            key={productVariant.color.id}
                            className={`color-option ${productVariant.color.name === selectedColor[firstProduct.id] ? 'selected' : 'selected'}`}
                            style={{ backgroundColor: productVariant.color.name }}
                            onClick={() => handleColorChange(firstProduct.id, productVariant.color.name)}
                          >
                          </button>
                        ))}
                  
                
                      </div>

                    </div>
                  )
                })}
                {isModalOpen && (
                  <ModalImageProduct onClose={closeModal} image={modalContent.image} description={modalContent.description} name={modalContent.name} />
                )}
              </div>
            )}


            {totalPages > 1 && (
              <div className="pagination flex justify-center mt-8">
                <Pagination
                  layout="navigation"
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}