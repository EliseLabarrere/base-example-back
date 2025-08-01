const router = require('express').Router();
const authController = require('../controllers/auth');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided details.
 *     security: [] 
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The user's first name.
 *                 example: John
 *               lastname:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *                 example: Test-123
 *               confirmPassword:
 *                 type: string
 *                 format: confirmPassword
 *                 description: The confirmation of the password.
 *                 example: Test-123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the registration was successful.
 *                   example: true
 *                 user:
 *                   type: object
 *                   description: The newly created user object.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier of the user.
 *                       example: "670507e5a85e8b4542098ab9"
 *                     firstname:
 *                       type: string
 *                       description: The first name of the user.
 *                       example: John
 *                     lastname:
 *                       type: string
 *                       description: The last name of the user.
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                       example: john.doe@example.com
 *       400:
 *         description: Bad request - Invalid input or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the validation error.
 *                   example: "Email is required"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message returned by the server.
 *                   example: "Some error occurred while registering user"
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Logs in a user and returns a JWT token for authenticated access.
 *     security: [] 
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *                 example: Test-123
 *     responses:
 *       200:
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: "Successfully logged in"
 *                 user:
 *                   type: object
 *                   properties:
 *                     firstname:
 *                       type: string
 *                       description: The first name of the user.
 *                       example: John
 *                     lastname:
 *                       type: string
 *                       description: The last name of the user.
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                       example: john.doe@example.com
 *                     token:
 *                       type: string
 *                       description: JWT token for accessing protected routes.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Unauthorized - Email or password incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message for incorrect email or password.
 *                   example: "Email or Password wrong"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message returned by the server.
 *                   example: "Some error occurred while logging user"
 */
router.post('/login', authController.login);

module.exports = router;
