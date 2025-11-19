# Text Paragraph Backend (Node.js + Express + MongoDB)

This is a simple backend project built with **Node.js, Express, and MongoDB (Mongoose)**.
It stores text in paragraph form inside MongoDB and exposes APIs to **insert, update, fetch, and delete** paragraphs.

---

## 1. Features

- Store any text paragraph in MongoDB.
- APIs:
  - `POST   /api/paragraphs` – Insert a new paragraph (text in paragraph).
  - `GET    /api/paragraphs` – Get all paragraphs.
  - `GET    /api/paragraphs/:id` – Get one paragraph by ID.
  - `PUT    /api/paragraphs/:id` – Update an existing paragraph.
  - `DELETE /api/paragraphs/:id` – Delete a paragraph.
- Clean and simple folder structure.

---

## 2. Installation

1. **Download** or clone this folder.
2. Open the project in your terminal:

   ```bash
   cd text-paragraph-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create your `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and put your MongoDB connection string:

   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/paragraphdb
   ```

5. Start the server in dev mode (auto restart):

   ```bash
   npm run dev
   ```

   Or production mode:

   ```bash
   npm start
   ```

---

## 3. Example Request Body (Insert Paragraph)

### POST /api/paragraphs

```json
{
  "title": "My first paragraph",
  "content": "This is a sample paragraph text that will be stored in MongoDB."
}
```

### Response Example

```json
{
  "success": true,
  "data": {
    "_id": "665abc1234ef56789abc0123",
    "title": "My first paragraph",
    "content": "This is a sample paragraph text that will be stored in MongoDB.",
    "createdAt": "2025-11-20T12:00:00.000Z",
    "updatedAt": "2025-11-20T12:00:00.000Z",
    "__v": 0
  }
}
```

---

## 4. Update API Example

### PUT /api/paragraphs/:id

```json
{
  "title": "Updated title",
  "content": "Updated paragraph text."
}
```

---

## 5. Test Quickly with curl or Postman

- Base URL (local): `http://localhost:5000`

Endpoints:

- `POST   /api/paragraphs`
- `GET    /api/paragraphs`
- `GET    /api/paragraphs/:id`
- `PUT    /api/paragraphs/:id`
- `DELETE /api/paragraphs/:id`

This backend is ready to connect with any frontend (React, Next.js, plain HTML, etc.).
