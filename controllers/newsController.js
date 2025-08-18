const News = require("../models/newsModel");

const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    console.log(`Error Fetching News: ${error}`.red);
    res.status(500).json({ message: "Server error, please try again later!" });
  }
};

const getNewsById = async (req, res) => {
    try {
        const id = req.params.id;
        const news = await News.findById(id);

        if(!news){
            return res.status(404).json({message: `the News with id: ${id} was not found!`})
        }

        res.status(200).json(news);
    } catch (error) {
        console.log(`Error Fetching News: ${error}`.red);
        res.status(500).json({ message: `Server error: ${error.message}` });
    }

}

const postNews = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "title and description are required fields!" });
    }

    const news = await News.create({
      title,
      description,
    });

    res.status(201).json(news);
  } catch (error) {
    console.log(`Error creating news: ${error}`);
    res.status(500).json({ message: "Server error, please try again later!" });
  }
};

const updateNews = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    const news = await News.findById(id);
    if (!news) {
      return res
        .status(404)
        .json({ message: `the News with id: ${id} was not found!` });
    }

    if (title) {
      news.title = title;
    }
    if (description) {
      news.description = description;
    }

    const updatednews = await news.save();
    res.json(updatednews);
  } catch (error) {
    console.log(`Error Updating News: ${error}`.red);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

const deleteNews = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await News.findById(id);

    if (!news) {
      return res
        .status(404)
        .json({ message: `the News with id: ${id} was not found!` });
    }
    await news.deleteOne();
    res
      .status(200)
      .json({ message: `The news with id: ${id} is deleted successfully!` });
  } catch (error) {
    console.log(`Error Deleting News: ${error}`.red);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

module.exports = { getNews, getNewsById, postNews, updateNews, deleteNews };
