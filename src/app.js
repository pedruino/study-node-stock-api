const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Stock API',
            version: '1.0.0',
        },
    },
    apis: [path.resolve(__filename)],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

let products = readDataFromFile();

function saveDataToFile(data) {
    fs.writeFileSync('./datasource/data.json', JSON.stringify(data, null, 2));
}

function readDataFromFile() {
    try {
        const data = fs.readFileSync('./datasource/data.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return []; // Retorna um array vazio se o arquivo não existir
    }
}

app.use(bodyParser.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       properties:
 *         id:
 *           type: integer
 *         createdAt:
 *           type: string
 *         name:
 *           type: string
 *         salePrice:
 *           type: number
 *         reference:
 *           type: string
 *         unitOfMeasure:
 *           type: string
 *         manufacturer:
 *           type: string
 *         stock:
 *           type: integer
 *         productImage:
 *           type: string
 */

// List products
/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get('/products', (req, res) => {
    res.json(products);
});

// Update a product
/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: The product was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *       404:
 *         description: Product not found
 */
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Create a new product
/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 */
app.post('/products', (req, res) => {
    const { name, salePrice, reference, unitOfMeasure, manufacturer, stock, productImage } = req.body;

    const newProduct = {
        id: products.length + 1,        
        name,
        salePrice,
        reference,
        unitOfMeasure,
        manufacturer,
        stock,
        productImage,
        createdAt: new Date().toISOString(),
    };
    products.push(newProduct);
    saveDataToFile(products);
    res.status(201).json({
        statusCode: 201,
        message: `Product ${newProduct.id} created successfully!`
    });
});

// Update a product
/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: The product was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *       404:
 *         description: Product not found
 */
app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        Object.assign(product, req.body);
        saveDataToFile(products)
        res.json({
            statusCode: 201,
            message: `Product ${product.id} updated successfully!`
        });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Delete a product
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     responses:
 *       201:
 *         description: The product was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *       404:
 *         description: Product not found
 */
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        products.splice(index, 1);
        res.json({
            statusCode: 201,
            message: `Product ${req.params.id} deleted successfully!`
        });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

/**
 * @swagger
 * /products/pagination/{page}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a paginated list of products with page in path
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: The page number, starts from 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: The number of products per page
 *     responses:
 *       200:
 *         description: A paginated list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
app.get('/products/pagination/:page', (req, res) => {
    const products = readDataFromFile();
    const page = parseInt(req.params.page);
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const paginatedProducts = products.slice(offset, offset + limit);
    const result = {
        total: products.length,
        page: page,
        limit: limit,
        products: paginatedProducts
    };

    res.json(result);
});

app.listen(port, () => {
    console.log(`Stock API listening at http://localhost:${port}`);
});
