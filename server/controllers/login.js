import {Student} from '../models/students.js';
import {Teacher} from '../models/teacher.js';
import pkg from 'bcrypt';

const bcrypt = pkg

const saltRounds = 10;

const login = async (req, res) => {
    let user = null;
    let userType = req.params['userType'];
    /**
     * ? req.params returneaza un array de path parameters. Din acel array vreau doar userType.
     * ? Un path parameter apare cu /nume in path-ul nostru.
     * ? la noi ruta va fi http:localhost:8080/api/account/login/:userType
     * ? daca tu vrei sa o foloseti pt Student atunci :userType se inlocuieste cu Student
     * ? Si arata asa http://localhost:8080/api/account/login/Student
     */
    try {
        if (userType === 'Student') {
            user = await Student.findOne({
                where: {
                    mail: req.body.mail
                }
            });

            if (user === null) {
                res.status(404).json('Mail not found');
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, isTheSamePassword) {
                    //* isTheSamePassword ne da true daca parola data de user si parola din baza de date se potrivesc, o sa hash-uiasca si parola scrisa de user ca sa le poata compara
                    if (isTheSamePassword === true) {
                        res.status(200).json({
                            userType: 'Student',
                            mail: user.mail,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            faculty: user.faculty,
                            group: user.group,
                            series: user.series,
                            year: user.year
                        })
                    } else {
                        res.status(400).json('Wrong password for this student account')
                    }
                });
            }
        } else {
            user = await Teacher.findOne({
                where: {
                    mail: req.body.mail
                }
            });

            if (user === null) {
                res.status(404).json('Mail not found');
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, isTheSamePassword) {
                    if (isTheSamePassword === true) {
                        res.status(200).json({
                            userType: 'Teacher',
                            mail: user.mail,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            department: user.department
                        })
                    } else {
                        res.status(400).json('Wrong password for this teacher account')
                    }
                });
            }
        }
    } catch (e) {
        res.status(500).json('Database error');
        console.log(e);
    }
};

//? ruta pentru inregistrarea pe site. O sa selecteze din front daca e profesor sau elev si va primi campurile necesare.
const register = async (req, res) => {
    let userType = req.body.userType;
    if (req.body.mail) {
        //* daca nu avem mail trebuie sa dam 400 fiindca nu avem cum sa facem cautari in baza de date
        try {
            //* trebuie puse in try catch fiindca .creat poate arunca eroare
            let existingTeacher = await Teacher.findOne({
                where: {
                    mail: req.body.mail
                }
            });
            let existingStudent = await Student.findOne({
                where: {
                    mail: req.body.mail
                }
            });

            if (existingTeacher === null && userType === 'Teacher' &&
                commonBodyValidations(req) && req.body.department !== undefined) {
                //* verificam verificam tipul de user si daca avem toate campurile completate. Pentru ca validarile din front pot fi bypassed.
                insertTeacher(req);
                res.status(201).json(userType + ' created');
            } else if (existingStudent === null && commonBodyValidations(req)
                && req.body.faculty !== undefined && req.body.year !== undefined
                && req.body.series !== undefined && req.body.group_number !== undefined) {
                insertStudent(req);
                res.status(201).json(userType + ' created');
            } else if (existingTeacher || existingStudent) {
                res.status(400).json('User already exists')
            } else {
                //* daca nu e Student sau Teacher sau daca nu a completat toate campurile ii dam un 400 bad request cu un mesaj
                res.status(400).json('Bad request. Incorrect data format')
            }
        } catch (e) {
            res.status(500).json('Server Error');
            console.error(e)
        }
    } else {
        res.status(400).json('No email')
    }
}

const insertTeacher = async (req) => {
    //* bcrypt ne cripteaza parola automat, folosing saltRounds (cu cat nr e mai mare cu atat e criptata mai bine, dar consuma mai multe resurse). hash e parola criptata si o bagam pe aia in baza de date
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        await Teacher.create({
            //* .create ne returneaza si userul pe care l-a facut. Putem sa ne folosim de asta daca vrem. E util in debugging
            first_name: req.body.first_name, last_name: req.body.last_name,
            mail: req.body.mail, password: hash,
            department: req.body.department
        });
    });
}

const insertStudent = async (req) => {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        await Student.create({
            first_name: req.body.first_name, last_name: req.body.last_name,
            mail: req.body.mail, password: hash,
            faculty: req.body.faculty, year: req.body.year,
            series: req.body.series, group: req.body.group_number
        });
    });
}

const commonBodyValidations = (req) => {
    //* validarile comune le-am bagat aici ca sa mai economisim spatiu in functiile principale
    return req.body.first_name !== undefined &&
        req.body.last_name !== undefined && req.body.mail !== undefined &&
        req.body.password !== undefined;
}

export {login, register};