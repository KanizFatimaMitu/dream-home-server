const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

// user = dreamhome
// pass = o1C0uFK8oa5zkC79



const uri = "mongodb+srv://dreamhome:o1C0uFK8oa5zkC79@cluster0.ypvh0lp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  });


  async function run() {
    try {
     const packagesCollection = client.db("dream-home").collection("package")
     const bookingsCollection = client.db("dream-home").collection("bookings")
     const designsCollection = client.db("dream-home").collection("designs")

     // http://localhost:5000/designs
     app.get('/designs', async (req, res) => {
      const designs = await designsCollection.find({}).toArray();
      res.send(designs)
    })

    // http://localhost:5000/booking
     app.post('/booking', async (req, res) => {
      const newBooking = req.body
      const confirmBooking = await bookingsCollection.insertOne(newBooking);
      res.send(confirmBooking)
    })

    // http://localhost:5000/packages
     app.get('/packages', async (req, res) => {
      const packages = await packagesCollection.find({}).toArray();
      res.send(packages)
    })

    } finally {
     
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('hey i am mitu')
})

app.listen(port, () => {
  console.log(` listening on port`)
})