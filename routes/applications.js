const mongoose = require('mongoose');
const Applications = mongoose.model('Applications');

module.exports = (app) => {
  app.get('/', (req, res) => {
    const welcome = `<html><body>This is the backend server for App Tracker</body></html>`;
    res.send(welcome);
  });
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

  // get stats by userId
  app.get('/getStatsByUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    const submitted = await Applications.countDocuments({ userId: userId });
    const interviewed = await Applications.countDocuments({
      userId: userId,
      status: 'Interview in progress',
    });
    const rejected = await Applications.countDocuments({
      userId: userId,
      status: 'Rejected',
    });
    const result = { submitted, interviewed, rejected };
    if (result) {
      res.status(200).json(result);
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
        _id: req.body.id,
      },
      {
        $set: req.body.update,
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
  app.put('/deleteJob', async (req, res) => {
    const deleteItem = await Applications.findByIdAndRemove(
      {
        _id: req.body.id,
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
