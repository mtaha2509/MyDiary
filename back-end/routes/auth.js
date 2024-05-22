const { Router } = require("express");
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  diarypage,
  timecapsule,
  getDiary,
  getPosts,
  postPost,
  editBlog,
  deleteBlog,
  getUser,
  createTodo,
  getTodos,
  deleteTodo,
  getTimeCapsule,
} = require("../controllers/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const { registerValidation, loginValidation } = require("../validators/auth");
const { userAuth } = require("../middlewares/auth-middleware");
const router = Router();

router.get("/get-users", getUsers);
router.get("/getTimeCapsule", getTimeCapsule);
router.get("/get-user", getUser);
router.get("/protected", userAuth, protected);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/logout", logout);
router.post("/diarypage", diarypage);
router.post("/timecapsule", timecapsule);

router.get("/diarypage", getDiary);
router.get("/getPosts", getPosts);
router.post("/postPost", postPost);
router.put("/editBlog", editBlog);
router.delete("/deleteBlog/:blog_id", deleteBlog);
router.post("/createTodo", createTodo);
router.get("/getTodos", getTodos);
router.delete("/deleteTodo/:id", deleteTodo);
module.exports = router;
