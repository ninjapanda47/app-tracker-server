const mongoose = require('mongoose');
const Applications = mongoose.model('Applications');

module.exports = app => {
  // get applications by userId
  app.get('/getByUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    const results = await Applications.find({ userId: userId });
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(200).json('No results');
    }
  });

  // Add new application
  app.post('/addJob', async (req, res) => {
    const job = new Applications(req.body);
    await job.save();
    res.status(200).json(job);
  });

  // Update application status
  app.post('/updateJob', async (req, res) => {
    const updateItem = await Applications.findByIdAndUpdate(
      {
        _id: req.body.id
      },
      {
        $set: req.body.update
      },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          return doc;
        }
      }
    );
    res.status(200).json(updateItem);
  });

  // Delete application
  app.put('/deleteJob/:jobId', async (req, res) => {
    console.log(req.body.params);
    const deleteItem = await Applications.findByIdAndRemove(
      {
        _id: req.body.params.jobId
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          return doc;
        }
      }
    );
    res.status(200).json(deleteItem);
  });
};
