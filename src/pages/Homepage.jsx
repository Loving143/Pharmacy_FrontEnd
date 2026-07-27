import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryBar from "../components/CategoryBar";
import styles from "./Homepage.module.css";
import AuthService from "../Services/AuthService";

const ITEMS_PER_PAGE = 9;

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await AuthService.getCategories();
      if (res?.data) {
        const sorted = [...res.data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCategories(sorted);
        setFiltered(sorted);
      }
    } catch (err) {
      console.log("Error loading categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    setCurrentPage(1);

    const results = categories.filter((cat) =>
      cat.name.toLowerCase().includes(text.toLowerCase())
    );

    setFiltered(results);
  };

  const handleSort = (type) => {
    setSortType(type);
    setCurrentPage(1);

    const sorted = [...filtered].sort((a, b) =>
      type === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setFiltered(sorted);
  };

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const currentItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openCategory = (cat) => {
    navigate(`/subcategories/${cat.categoryCode}`, {
      state: {
        subcategories: cat.subCategoryList,
        categoryName: cat.name,
      },
    });
  };

  return (
    <div className={styles.page}>
      <CategoryBar />

      <div className={styles.container}>
        <h1 className={styles.heading}>Browse by Category</h1>
        <h4 className={styles.subheading}>
          Explore our wide range of medical categories
        </h4>

        <div className={styles.topBar}>
          <input
            className={styles.search}
            placeholder="Search categories..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <select
            className={styles.sort}
            value={sortType}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="asc">Sort A → Z</option>
            <option value="desc">Sort Z → A</option>
          </select>
        </div>

        <div className={styles.grid}>
          {currentItems.map((cat) => (
            <div
              key={cat.categoryCode}
              className={styles.card}
              onClick={() => openCategory(cat)}
            >
              <div>
                <h3 className={styles.cardTitle}>{cat.name}</h3>
                <p className={styles.cardSub}>
                  {cat.subCategoryList?.length} subcategories
                </p>
              </div>
              <div className={styles.arrow}>→</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles.pageNumber} ${
                currentPage === i + 1 ? styles.activePage : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={styles.pageBtn}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
