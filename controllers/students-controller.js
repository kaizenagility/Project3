const bcrypt = require('bcryptjs');
const Student = require('../models/student');

const studentsController = {};

studentsController.index = (req, res) => {
    Student.findAll()
        .then(students => {
            res.status(200).json({
                message: 'Put a student profile page on this route',
                data: { students },
            })
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: '400', err });
        });
};

studentsController.show = (req, res, next) => {
    Student.findbyEmail(req.params.email)
        .then(student => {
            res.status(200).json({
                message: 'ok-show one student by email',
                data: { student }
            });
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: '400', err });
        });
};
//added next...?  do I need to add email?

studentsController.create = (req, res, next) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password_digest, salt);
    Student.create({
        email: req.body.email,
        password_digest: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        cycle: req.body.cycle,
        aboutme: req.body.aboutme,
        ispriority: false,
    }).then(student => {
        req.login(student, (err) => {
            if (err) return next(err);
            res.redirect(`/student/${req.user.email}`);
            // res.status(201).json({
            //     message: 'student created successfully & this will redirect to intake form once it exists',
            //     data: {
            //         student: student,
            //     }
            // });
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

studentsController.update = (req, res, next) => {
    Student.update({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            cycle: req.body.cycle,
            aboutme: req.body.aboutme,
        }, req.params.email)
        .then(student => {
            res.status(202).json({
                message: 'updated successfully',
                data: {
                    student: student,
                },
            }).then(student => {
                res.redirect('/profile');
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        });
}


studentsController.delete = (req, res, next) => {
    Student.destroy(req.params.email)
        .then(() => {
            res.redirect('/index');
        }).catch(err => {
            res.status(500).json({
                err,
            });
        });
};

module.exports = studentsController;