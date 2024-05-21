const { Router } = require("express");
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  diarypage,
  getDiary,
  getPosts,
  postPost,
} = require("../controllers/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const { registerValidation, loginValidation } = require("../validators/auth");
const { userAuth } = require("../middlewares/auth-middleware");
const router = Router();

router.get("/get-users", getUsers);
router.get("/protected", userAuth, protected);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/logout", logout);
router.post("/diarypage", diarypage);
router.get("/diarypage", getDiary);
router.get("/getPosts", getPosts)
router.post("/postPost", postPost)

module.exports = router;
