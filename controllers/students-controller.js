const bcrypt = require('bcryptjs');
const Student = require('../models/student');

const studentsController = {};

studentsController.index = (req, res) => {
  Student.findAll()
    .then(students => {
      res.status(200).json({
        message: 'Put a student profile page on this route',
        data: {students},
      })
    }).catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
};

studentsController.show = (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => {
      res.status(200).json({
        message: 'ok-show one student by id',
        data: {
        student: student,
      }
    });
  }).catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
  });
};
//added next...?  do I need to add email?
studentsController.create = (req, res, next) => {
    // const salt = bcrypt.genSaltSync();
    // const hash = bcrypt.hashSync(req.body.password, salt);
    Student.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        cycle: req.body.class,
        aboutme: req.body.aboutme,
    }).then(student => {
        req.login(student, (err) => {
            if (err) return next(err);
            res.redirect('/student');
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

studentsController.update = (req, res, next) => {
  Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    cycle: req.body.class,
    aboutme: req.body.aboutme,
  }, req.params.id)
    .then(student => {
      res.status(202).json({
        message: 'updated successfully',
        data: {
          student: student,
        },
      });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  };

module.exports = studentsController;
