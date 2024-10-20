import React, { useState } from 'react';
import { Button, Modal, Form, Card, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    quantity: '',
    category: '',
    description: ''
  });
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  
  // Filter state
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    setProducts((prev) => [...prev, formData]);
    setFormData({ title: '', price: '', quantity: '', category: '', description: '' });
    setShowModal(false);
  };

  const handleEditProduct = (index) => {
    setCurrentProductIndex(index);
    setFormData(products[index]);
    setEditModal(true);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[currentProductIndex] = formData;
    setProducts(updatedProducts);
    setEditModal(false);
    alert("Product Updated Successfully!"); // Confirmation alert
  };

  const handleDeleteProduct = (index) => {
    setCurrentProductIndex(index);
    setDeleteModal(true);
  };

  const confirmDeleteProduct = () => {
    const updatedProducts = products.filter((_, i) => i !== currentProductIndex);
    setProducts(updatedProducts);
    setDeleteModal(false);
  };

  // Filter and sort logic
  const filteredProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? product.category.toLowerCase() === categoryFilter.toLowerCase() : true)
    )
    .sort((a, b) => {
      if (priceFilter === 'low-to-high') return a.price - b.price;
      if (priceFilter === 'high-to-low') return b.price - a.price;
      return 0;
    });

  return (
    <div className="dashboard">
      <h1 className="dashboard-header">MyStore | Shopping Cart</h1> {/* Header added */}

      {/* Add Product Button at the top */}
      <Button variant="success" onClick={() => setShowModal(true)} className="add-product-button">Add Product</Button>

      {/* Search Bar */}
      <div className="search-bar">
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ height: '50px' }} // Adjusted height
          />
        </InputGroup>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <Form.Group controlId="formCategoryFilter">
          <Form.Label>Filter by Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category to filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPriceFilter">
          <Form.Label>Sort by Price</Form.Label>
          <Form.Control
            as="select"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">Select</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </Form.Control>
        </Form.Group>
      </div>

      {/* Add Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Form fields */}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="success" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Form fields */}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
      <Button variant="primary" onClick={handleUpdateProduct}>
              Update Product
      </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this product?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDeleteProduct}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Product Cards Container */}
      <div className="product-container" style={{ overflowY: 'scroll', maxHeight: '400px' }}>
        {filteredProducts.map((product, index) => (
          <Card key={index} className="product-card">
            <Card.Body>
      <Card.Title>{product.title}</Card.Title>
      <Card.Text>
                Price: ${product.price}<br />
                Quantity: {product.quantity}<br />
                Category: {product.category}<br />
                Description: {product.description}
     </Card.Text>
              <Button variant="warning" onClick={() => handleEditProduct(index)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDeleteProduct(index)}>Delete</Button>
    </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
