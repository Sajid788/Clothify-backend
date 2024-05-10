const cors = require('cors');
const express = require("express");

const { connection,PORT} = require("./config/db");
const { userRouter } = require("./routes/user_routes");
const { adminRouter } = require('./routes/admin_routes');
const { productRouter } = require('./routes/product_routes');
const { cartRouter } = require('./routes/cart_routes');
const { authorizedMiddleware } = require('./middleware/authorizedMiddleware');
const { orderRouter } = require('./routes/order_routes');
const { WishlistRouter } = require('./routes/wishlist_routes');

const app = express();
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send({msg:"Welcome to the home page!"});
});

// Routes
app.use("/user", userRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter);
app.use('/cart', authorizedMiddleware, cartRouter);
app.use('/order', orderRouter);
app.use('/wishlist', authorizedMiddleware, WishlistRouter);

// Not found route
app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected deta base")
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running at ${PORT}`);
});
