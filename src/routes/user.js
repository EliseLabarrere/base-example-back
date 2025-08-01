const router = require('express').Router();
const userController = require('../controllers/user');
const { verifyToken } = require('../middleware/jwt');
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing user information
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get the current user's information
 *     description: Retrieve the information of the currently authenticated user based on the provided JWT token.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []  # Indicates that this route requires a bearer token
 *     responses:
 *       200:
 *         description: Successfully retrieved user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the user.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 firstName:
 *                   type: string
 *                   description: The user's first name.
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   description: The user's last name.
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                   example: john.doe@example.com
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.get('/me', authMiddleware, userController.getMyInfos);

/**
 * @swagger
 * /api/user:
 *   put:
 *     summary: Edit the current user's profile
 *     description: Update the authenticated user's profile information. The user must be authenticated to access this route.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's updated first name.
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 description: The user's updated last name.
 *                 example: Smith
 *               email:
 *                 type: string
 *                 description: The user's updated email address.
 *                 example: jane.smith@example.com
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "User was updated successfully."
 *                 user:
 *                   type: object
 *                   description: Updated user object.
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "670507e5a85e8b4542098ab9"
 *                     firstName:
 *                       type: string
 *                       example: Jane
 *                     lastName:
 *                       type: string
 *                       example: Smith
 *                     email:
 *                       type: string
 *                       example: jane.smith@example.com
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/', authMiddleware, userController.editProfile);

module.exports = router;
