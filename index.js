const express = require('express')
const request = require('request-promise')

const app = express();
const PORT = process.env.PORT || 5000;

// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Welcome to Amazon Scrapper API");
})

// GET Product Details
app.get('/products/:productId', async (req, res) => {
    const {productId} = req.params;
    const {api_key} = req.query;
    console.log(api_key)

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/dp/${productId}`)
        // console.log("res.json(response) ---->", res.json(response))
        // console.log("(response) ---->", response)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})

// GET Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const {productId} = req.params;
    const {api_key} = req.query;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/product-reviews/${productId}`)
        // console.log("res.json(response) ---->", JSON.parse(response).product.name)
        // console.log("(response) ---->", response)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})

// GET product offers
app.get('/products/:productId/offers', async (req, res) => {
    const {productId} = req.params;
    const {api_key} = req.query;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/gp/offer-listing/${productId}`)
        // console.log("res.json(response) ---->", JSON.parse(response).product.name)
        // console.log("(response) ---->", response)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})

// GET search results
app.get('/search/:searchQuery', async (req, res) => {
    const {searchQuery} = req.params;
    const {api_key} = req.query;

    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/s?k=/${searchQuery}`)
        // console.log("res.json(response) ---->", JSON.parse(response).product.name)
        // console.log("(response) ---->", response)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
