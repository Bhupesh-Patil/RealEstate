import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RealState Backend API",
      version: "1.0.0",
      description: "API documentation for the RealState backend services.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      { name: "Health", description: "Service health endpoint" },
      { name: "Auth", description: "Authentication endpoints" },
      { name: "User", description: "User profile endpoints" },
      { name: "Property", description: "Property management endpoints" },
      { name: "Inquiry", description: "Inquiry endpoints" },
      { name: "Wishlist", description: "Wishlist endpoints" },
      { name: "Admin", description: "Admin-only endpoints" },
      { name: "Chat", description: "Chat endpoints" },
      { name: "Contact", description: "Contact form endpoints" },
    ],
    paths: {
      "/": {
        get: {
          tags: ["Health"],
          summary: "Check API status",
          responses: {
            200: {
              description: "API is running",
            },
          },
        },
      },
      "/api/auth/register": { post: { tags: ["Auth"], summary: "Register a new user", responses: { 200: { description: "Registered successfully" } } } },
      "/api/auth/login": { post: { tags: ["Auth"], summary: "Login user", responses: { 200: { description: "Logged in successfully" } } } },
      "/api/auth/me": {
        get: {
          tags: ["Auth"],
          summary: "Get current logged in user",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "User details fetched" } },
        },
      },
      "/api/auth/verify-email": { post: { tags: ["Auth"], summary: "Verify user email", responses: { 200: { description: "Email verified" } } } },
      "/api/auth/forgot-password": { post: { tags: ["Auth"], summary: "Send forgot password email", responses: { 200: { description: "Reset link sent" } } } },
      "/api/auth/reset-password/{token}": {
        post: {
          tags: ["Auth"],
          summary: "Reset password with token",
          parameters: [{ in: "path", name: "token", required: true, schema: { type: "string" } }],
          responses: { 200: { description: "Password reset successful" } },
        },
      },
      "/api/user/profile": {
        get: { tags: ["User"], summary: "Get own profile", security: [{ bearerAuth: [] }], responses: { 200: { description: "Profile fetched" } } },
        put: { tags: ["User"], summary: "Update own profile", security: [{ bearerAuth: [] }], responses: { 200: { description: "Profile updated" } } },
      },
      "/api/user/public/{id}": {
        get: {
          tags: ["User"],
          summary: "Get public profile by user id",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { 200: { description: "Public profile fetched" } },
        },
      },
      "/api/property": {
        get: { tags: ["Property"], summary: "List all properties", responses: { 200: { description: "Properties fetched" } } },
        post: { tags: ["Property"], summary: "Create property (seller only)", security: [{ bearerAuth: [] }], responses: { 200: { description: "Property created" } } },
      },
      "/api/property/my": { get: { tags: ["Property"], summary: "Get seller properties", security: [{ bearerAuth: [] }], responses: { 200: { description: "Seller properties fetched" } } } },
      "/api/property/{id}": {
        get: { tags: ["Property"], summary: "Get property details", parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Property details fetched" } } },
        put: { tags: ["Property"], summary: "Update property (seller only)", security: [{ bearerAuth: [] }], parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Property updated" } } },
        delete: { tags: ["Property"], summary: "Delete property (seller only)", security: [{ bearerAuth: [] }], parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Property deleted" } } },
      },
      "/api/property/{id}/status": {
        patch: {
          tags: ["Property"],
          summary: "Update property status (seller only)",
          security: [{ bearerAuth: [] }],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { 200: { description: "Property status updated" } },
        },
      },
      "/api/property/counts": { get: { tags: ["Property"], summary: "Get property counts", responses: { 200: { description: "Counts fetched" } } } },
      "/api/property/seller/dashboard": { get: { tags: ["Property"], summary: "Get seller dashboard", security: [{ bearerAuth: [] }], responses: { 200: { description: "Dashboard data fetched" } } } },
      "/api/inquiry": { post: { tags: ["Inquiry"], summary: "Send inquiry (buyer only)", security: [{ bearerAuth: [] }], responses: { 200: { description: "Inquiry sent" } } } },
      "/api/inquiry/seller": { get: { tags: ["Inquiry"], summary: "Get seller inquiries", security: [{ bearerAuth: [] }], responses: { 200: { description: "Inquiries fetched" } } } },
      "/api/inquiry/{id}/read": { patch: { tags: ["Inquiry"], summary: "Mark inquiry as read", security: [{ bearerAuth: [] }], parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Inquiry updated" } } } },
      "/api/wishlist": { get: { tags: ["Wishlist"], summary: "Get wishlist", security: [{ bearerAuth: [] }], responses: { 200: { description: "Wishlist fetched" } } } },
      "/api/wishlist/{propertyId}": {
        post: { tags: ["Wishlist"], summary: "Add property to wishlist", security: [{ bearerAuth: [] }], parameters: [{ in: "path", name: "propertyId", required: true, schema: { type: "string" } }], responses: { 200: { description: "Added to wishlist" } } },
        delete: { tags: ["Wishlist"], summary: "Remove property from wishlist", security: [{ bearerAuth: [] }], parameters: [{ in: "path", name: "propertyId", required: true, schema: { type: "string" } }], responses: { 200: { description: "Removed from wishlist" } } },
      },
      "/api/admin/users": { get: { tags: ["Admin"], summary: "Get all users", security: [{ bearerAuth: [] }], responses: { 200: { description: "Users fetched" } } } },
      "/api/admin/users/{id}/block": { patch: { tags: ["Admin"], summary: "Block user", security: [{ bearerAuth: [] }], parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "User blocked" } } } },
      "/api/admin/users/{id}": { delete: { tags: ["Admin"], summary: "Delete user", security: [{ bearerAuth: [] }], parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "User deleted" } } } },
      "/api/admin/properties": { get: { tags: ["Admin"], summary: "Get all properties", security: [{ bearerAuth: [] }], responses: { 200: { description: "Properties fetched" } } } },
      "/api/admin/properties/{id}": { delete: { tags: ["Admin"], summary: "Delete property", security: [{ bearerAuth: [] }], parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Property deleted" } } } },
      "/api/admin/inquiries": { get: { tags: ["Admin"], summary: "Get all inquiries", security: [{ bearerAuth: [] }], responses: { 200: { description: "Inquiries fetched" } } } },
      "/api/admin/stats": { get: { tags: ["Admin"], summary: "Get dashboard stats", security: [{ bearerAuth: [] }], responses: { 200: { description: "Stats fetched" } } } },
      "/api/admin/pending-sellers": { get: { tags: ["Admin"], summary: "Get pending sellers", security: [{ bearerAuth: [] }], responses: { 200: { description: "Pending sellers fetched" } } } },
      "/api/admin/approve-seller/{id}": { patch: { tags: ["Admin"], summary: "Approve seller", security: [{ bearerAuth: [] }], parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Seller approved" } } } },
      "/api/chat/start": { post: { tags: ["Chat"], summary: "Create or get chat", security: [{ bearerAuth: [] }], responses: { 200: { description: "Chat started or returned" } } } },
      "/api/chat/send": { post: { tags: ["Chat"], summary: "Send chat message", security: [{ bearerAuth: [] }], responses: { 200: { description: "Message sent" } } } },
      "/api/chat/user": { get: { tags: ["Chat"], summary: "Get all user chats", security: [{ bearerAuth: [] }], responses: { 200: { description: "Chats fetched" } } } },
      "/api/chat/{chatId}": {
        get: { tags: ["Chat"], summary: "Get chat messages", security: [{ bearerAuth: [] }], parameters: [{ in: "path", name: "chatId", required: true, schema: { type: "string" } }], responses: { 200: { description: "Chat fetched" } } },
        delete: { tags: ["Chat"], summary: "Delete chat", security: [{ bearerAuth: [] }], parameters: [{ in: "path", name: "chatId", required: true, schema: { type: "string" } }], responses: { 200: { description: "Chat deleted" } } },
      },
      "/api/chat/{chatId}/message/{messageId}": {
        delete: {
          tags: ["Chat"],
          summary: "Delete chat message",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "path", name: "chatId", required: true, schema: { type: "string" } },
            { in: "path", name: "messageId", required: true, schema: { type: "string" } },
          ],
          responses: { 200: { description: "Message deleted" } },
        },
      },
      "/api/contact": {
        post: { tags: ["Contact"], summary: "Create contact request", responses: { 200: { description: "Contact request created" } } },
        get: { tags: ["Contact"], summary: "Get contact requests (admin only)", security: [{ bearerAuth: [] }], responses: { 200: { description: "Contacts fetched" } } },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
