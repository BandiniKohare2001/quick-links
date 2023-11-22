import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
import Link from "./models/link.js";

const app = express();
app.use(express.json());

const connectDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    if(conn){
        console.log("MongoDB Connected");
    }
}

connectDB();

// app.post("/link",async (req, res)=>{
//     const {url, slug} = req.body;
// const randonSlug = Math.random().toString(36).substring(2, 7);
//     const link = new Link({
//         url: url,
//         slug: slug || randonSlug
//     })
//     try{
//         const savedLink = await link.save();
//         return res.json({
//             success: true,
//             data: {
//                 shortLink: `${process.env.BASE_URL}/${savedLink.slug}`
//             },
//             message: "Link saved Successfully"
//         });
//     }
//     catch(err){
//         return res.json({
//             success: false,
//             message: err.message
//         });
//     }
// })
app.post("/link", async (req, res) => {
  const { url, slug } = req.body;

  const randomSlug = Math.random().toString(36).substring(2, 7);

  const link = new Link({
    url: url,
    slug: slug || randomSlug,
  });

  try {
    const savedLink = await link.save();

    return res.json({
      success: true,
      data: {
        shortUrl: `${process.env.BASE_URL}/${savedLink.slug}`,
      },
      message: "Link saved successfully",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});


app.get("/:slug", async (req, res)=>{
    const {slug} = req.params;
    const link = await Link.findOne({slug: slug});

    await Link.updateOne({slug: slug}, {$set: {clicks: link.clicks + 1}})

    if(!link){
        return res.json({
            success: false,
            message: "Link not Found"
        })
    }
    res.redirect(link.url);
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});