
import React, { Children, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { getPersons, deletePerson } from '../api';

export default function ListPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  
  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // Filter items based on search term
    const filtered = items.filter(item =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone?.includes(searchTerm) ||
      item.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.education && item.education.some(edu => 
        edu.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    )
    setFilteredItems(filtered)
  }, [searchTerm, items])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getPersons()
      setItems(res.data)
      setFilteredItems(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return
    try {
      await deletePerson(id)
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading employees...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">All Employee List</h2>
        <Link to="/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Employee
        </Link>
      </div>

      {/* Search Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={clearSearch}
                    title="Clear search"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-end align-items-center h-100">
                <span className="badge bg-primary fs-6">
                  {filteredItems.length} of {items.length} employees
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Education</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(it => (
                  <tr key={it.id}>
                    <td className="fw-semibold">{it.name}</td>
                    <td>{it.phone}</td>
                    <td>
                      {it.email ? (
                        <a href={`mailto:${it.email}`} className="text-decoration-none">
                          {it.email}
                        </a>
                      ) : (
                        <span className="text-muted">Not provided</span>
                      )}
                    </td>
                    <td>
                      {(it.education || []).length > 0 ? (
                        <div className="d-flex flex-wrap gap-1">
                          {(it.education || []).map((edu, index) => (
                            <span key={index} className="badge bg-primary">
                              {edu}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">Not specified</span>
                      )}
                    </td>
                    <td>
                      {it.gender ? (
                        <span className={`badge ${
                          it.gender === 'Male' ? 'bg-info' :
                          it.gender === 'Female' ? 'bg-warning' : 'bg-secondary'
                        }`}>
                          {it.gender}
                        </span>
                      ) : (
                        <span className="text-muted">Not specified</span>
                      )}
                    </td>
                    <td>{it.address || <span className="text-muted">Not specified</span>}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Link 
                          to={`/edit/${it.id}`} 
                          className="btn btn-outline-primary btn-sm"
                        >
                          <i className="bi bi-pencil me-1"></i>
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(it.id)} 
                          className="btn btn-outline-danger btn-sm"
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-people display-1 text-muted"></i>
              <h5 className="text-muted mt-3">
                {searchTerm ? 'No employees found' : 'No employees found'}
              </h5>
              <p className="text-muted">
                {searchTerm 
                  ? 'Try adjusting your search terms to find what you\'re looking for.'
                  : 'Get started by adding your first employee'
                }
              </p>
              {!searchTerm ? (
                <Link to="/create" className="btn btn-primary mt-2">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add First Employee
                </Link>
              ) : (
                <button 
                  className="btn btn-outline-secondary mt-2"
                  onClick={clearSearch}
                >
                  <i className="bi bi-arrow-counterclockwise me-2"></i>
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      {filteredItems.length > 0 && (
        <div className="mt-3 text-muted text-center small">
          Showing {filteredItems.length} of {items.length} employee(s)
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      )}
      
      {/* <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button> */}
    </div>
    </>
  )
}
