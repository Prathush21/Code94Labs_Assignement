const connectDB = require("./db");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

// Enable URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET,POST", "PUT"],
    credentials: true,
  })
);

// Connect to MongoDB
app.post("/api/addrecipe", async (req, res) => {
  const { data } = req.body;
  const { id, recipename, description, ingredients } = data;

  try {
    // Connect to the database
    const db = await connectDB();

    // Insert the recipe into the "recipes" collection
    const result = await db.collection("recipes").insertOne({
      id,
      recipename,
      description,
      ingredients,
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.sendStatus(500);
  }
});

app.get("/api/viewallrecipes", async (req, res) => {
    
  
    try {
      // Connect to the database
      const db = await connectDB();
  
      // Insert the recipe into the "recipes" collection
      const result = await db.collection("recipes").find({}).toArray();
  
     
      res.send(result);
    } catch (error) {
      console.error("Error saving recipe:", error);
      res.sendStatus(500);
    }
  });

app.put("/api/editrecipe", (req, res) => {
  const data = req.body.data;

  connectDB()
    .then((db) => {
      // MongoDB operations
      db.collection('recipes').updateOne(
        { id: data.id}, // Filter by document ID
        { $set: { recipename:data.recipename, description:data.description, ingredients:data.ingredients} } // Update fields
      );
      res.send(result);

    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      // Handle the connection error
    });
});

app.post("/api/deleterecipe", (req, res) => {
    const data = req.body;
  
    connectDB()
      .then((db) => {
        // MongoDB operations
        db.collection('recipes').deleteOne(
          { id: data.recipeid} // Update fields
        );
        res.send("Successfully deleted");


      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        // Handle the connection error
      });
  });

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
