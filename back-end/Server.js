const express = require("express");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5000;

const mysql = require("mysql");
// Connection By Database('Mysql')
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecobazar-ecommerce",
});
app.listen(port, () => {
  console.log(`The Server is Running http://localhost:${port}`);
});
// image
const multer = require("multer");
const path = require("path");
app.use("/uploads", express.static("uploads"));
const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)),
  }),
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    cb(null, allowed.includes(file.mimetype));
  },
});

// AuthController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    res.status(201).json({ message: "User created" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    res.json({ token, user: { name: user.name, email } });
};

// Get All Product
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    const baseUrl = req.protocol + "://" + req.get("host");

    const result = data.map((item) => ({
      ...item,
      image: `${baseUrl}/uploads/${item.image}`,
    }));

    res.json(result);
  });
});

// Get A Single Product
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM products WHERE id = ?";

  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);

    const baseUrl = req.protocol + "://" + req.get("host");

    const result = data.map((item) => ({
      ...item,
      image: `${baseUrl}/uploads/${item.image}`,
    }));

    res.json(result[0]);
  });
});

// Add New Product with Image Upload
app.post("/api/products", upload.single("image"), (req, res) => {
  const { name, price, description, category_id } = req.body;
  const image = req.file?.filename;

  if (!name || !price || !description || !category_id || !image) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql =
    "INSERT INTO products (name, price, image, description, category_id) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, price, image, description, category_id], (err, data) => {
    if (err) return res.json(err);
    res.json({ message: "Product added successfully", id: data.insertId });
  });
});

// Update Product with Image Upload
app.put("/api/products/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { name, price, description, category_id } = req.body;

  let image = req.file?.filename;

  if (!name || !price || !description || !category_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!image) {
    db.query("SELECT image FROM products WHERE id = ?", [id], (err, data) => {
      if (err) return res.json(err);

      image = data[0].image;

      updateProduct();
    });
  } else {
    updateProduct();
  }

  function updateProduct() {
    const sql =
      "UPDATE products SET name=?, price=?, image=?, description=?, category_id=? WHERE id=?";
    db.query(sql, [name, price, image, description, category_id, id], (err) => {
      if (err) return res.json(err);
      res.json({ message: "Product updated successfully" });
    });
  }
});
// Delete A Product
app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json(err);
    }
    res.json({ message: "Product deleted successfully" });
  });
});

//Get All Categories
app.get("/api/categories", (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    const baseUrl = req.protocol + "://" + req.get("host");

    const result = data.map((item) => ({
      ...item,
      image: `${baseUrl}/uploads/${item.image}`,
    }));

    res.json(result);
  });
});

// Get Single Category
app.get("/api/categories/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM categories WHERE id = ?";
  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json(err);
    }
    res.json(data);
  });
});

app.use("/uploads", express.static("uploads"));

// Add New Category with Image Upload
app.post("/api/categories", upload.single("image"), (req, res) => {
  const name = req.body.name;
  const image = req.file ? req.file.filename : null;

  if (!name || !image) {
    return res.status(400).json({ message: "Name or Image missing" });
  }

  const sql = "INSERT INTO categories (name, image) VALUES (?, ?)";
  db.query(sql, [name, image], (err, data) => {
    if (err) {
      res.json(err);
    }
    res.json({ message: "Category added successfully", id: data.insertId });
  });
});

// Update A Category
app.put("/api/categories/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE categories SET name = ?, image = ? WHERE id = ?";
  const values = [req.body.name, req.body.image];

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      res.json(err);
    }
    res.json({ message: "Category updated successfully" });
  });
});

// Delete A Category
app.delete("/api/categories/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM categories WHERE id = ?";

  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json(err);
    }
    res.json({ message: "Category deleted successfully" });
  });
});
