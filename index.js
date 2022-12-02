const express = require('express')
const request = require('request-promise')

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = "6e78a060b890e60cc168c1836318a2a7"
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Welcome to Amazon Scrapper API");
})

// GET Product Details
app.get('/products/:productId', async (req, res) => {
    const {productId} = req.params;

    try{
        const response = await request(`${baseUrl}&url=http://www.amazon.com/dp/${productId}`)
        // console.log("res.json(response) ---->", res.json(response))
        // console.log("(response) ---->", response)
        res.json(response)
    }catch(error){
        res.json(error)
    }
})

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
