var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
var config = require('../config');


const Users = require('../models/Users');
const Item = require('../models/Item');
const Treasure = require('../models/Activity');
const Traveler = require('../models/Booking');
const Category = require('../models/Category');
const Bank = require('../models/Bank');
const Booking = require('../models/Booking');
const Member = require('../models/Member');
const Emails = require('../models/Emails');

var nodemailer = require('nodemailer');

module.exports = {
    user_register : async (req,res)=>{
      try {
        let user = await Users.create({
          username : req.body.name,
          email : req.body.email,
          password : req.body.password
        }); 
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      
      } catch (err) {
        if(err.errors.email){
          return res.status(409).send({message:"Email already exists!"})
        }
         return res.status(500).send(err)
      }
    },
    login:  (req, res)=> {
       Users.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).send({ auth: true, token: token });
      });
      
    },
    me: (req, res)=> {
      Users.findById(req.userId, { password: 0 },function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
      });
    },
    logout: async (req, res) => {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        jwt.destroy(token)
        return res.json({message:"Token blacklisted. User logged out."});
    },
    landing_page : async (req,res)=>{
        try {
            const mostPicked = await Item.find()
                .select(`_id title country price unit imageId`)
                .limit(5)
                .populate({path:'imageId', select: '_id imageUrl'});
                
            const category = await Category.find()
                .select(`_id name`)
                .limit(3)
                .populate({
                    path:'itemId',
                    select: '_id title country city isPopular imageId',
                    perDocumentLimit: 4,
                    optopn:{sort:{sumBooking: -1}},
                    populate: {
                        path: 'imageId', 
                        select: '_id imageUrl',
                        perDocumentLimit: 1,
                    },
            });
            const traveler = await Treasure.find().count();
            const treasure = await Treasure.find().count();
            const city = await Item.find().count();

            for (let i = 0; i < category.length; i++) {
                for (let x = 0; x < category[i].itemId.length; x++) {
                    const item = await Item.findOne({ _id: category[i].itemId[x]._id });
                    item.isPopular = false;
                    await item.save();
                    if (category[i].itemId[0] === category[i].itemId[x]) {
                        item.isPopular = true;
                        await item.save();
                    }
                }
            }

            const testimonial = {
                _id: "asd1293uasdads1",
                imageUrl: "images/testimonial2.jpg",
                name: "Happy Family",
                rate: 4.55,
                content: "What a great trip with my family and I should try again next time soon ...",
                familyName: "Angga",
                familyOccupation: "Product Designer"
            }

            res.status(200).json({
                hero : {
                    travelers : traveler,
                    treasures : treasure,
                    cities : city,
                },
                mostPicked,
                categories : category,
                testimonial,
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: " Internal server error"})
        }
    },
    detailPage: async (req, res) => {
        try {
          const { id } = req.params;
          const item = await Item.findOne({ _id: id })
            .populate({ path: 'featureId', select: '_id name qty imageUrl' })
            .populate({ path: 'activityId', select: '_id name type imageUrl' })
            .populate({ path: 'imageId', select: '_id imageUrl' });
    
          const bank = await Bank.find();
    
          const testimonial = {
            _id: "asd1293uasdads1",
            imageUrl: "images/testimonial1.jpg",
            name: "Happy Family",
            rate: 4.55,
            content: "What a great trip with my family and I should try again next time soon ...",
            familyName: "Angga",
            familyOccupation: "Product Designer"
          }
    
          res.status(200).json({
            ...item._doc,
            bank,
            testimonial
          })
    
        } catch (error) {
            console.log(error);
          res.status(500).json({ message: "Internal server error" });
        }
    },
    bookingPage: async (req,res)=>{
      const {
          idItem,
          duration,
          // price,
          bookingStartDate,
          bookingEndDate,
          firstName,
          lastName,
          email,
          phoneNumber,
          accountHolder,
          bankFrom,
        } = req.body;
    
        if (!req.file) {
          return res.status(404).json({ message: "Image not found" });
        }
    
        console.log(idItem)
    
        if (
          idItem === undefined ||
          duration === undefined ||
          // price === undefined ||
          bookingStartDate === undefined ||
          bookingEndDate === undefined ||
          firstName === undefined ||
          lastName === undefined ||
          email === undefined ||
          phoneNumber === undefined ||
          accountHolder === undefined ||
          bankFrom === undefined) {
          res.status(404).json({ message: "Lengkapi semua field" });
        }
    
        const item = await Item.findOne({ _id: idItem });
    
        if (!item) {
          return res.status(404).json({ message: "Item not found" });
        }
    
        item.sumBooking += 1;
    
        await item.save();
    
        let total = item.price * duration;
        let tax = total * 0.10;
    
        const invoice = Math.floor(1000000 + Math.random() * 9000000);
    
        const member = await Member.create({
          firstName,
          lastName,
          email,
          phoneNumber
        });
    
        const newBooking = {
          invoice,
          bookingStartDate,
          bookingEndDate,
          total: total += tax,
          itemId: {
            _id: item.id,
            title: item.title,
            price: item.price,
            duration: duration
          },
    
          memberId: member.id,
          payments: {
            proofPayment: `images/${req.file.filename}`,
            bankFrom: bankFrom,
            accountHolder: accountHolder
          }
        }
    
        const booking = await Booking.create(newBooking);
    
        res.status(201).json({ message: "Success Booking", booking });
    },
    emailSender: async (req,res)=>{
      const {
        fromEmail,
        name,
        subject,
        message,
      } = req.body;
  
      if (
        fromEmail === undefined ||
        name === undefined ||
        subject === undefined ||
        message === undefined) {
        res.status(500).json({ message: "Lengkapi semua field" });
      }
        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.mailtrap_user,
              pass: process.env.mailtrap_pass
            }
        });

        var toEmail ='fatihalfikri21@gmail.com';

        var mailOptions = {
          from: fromEmail,
          to: toEmail,
          subject: subject,
          text: message
        };

        transporter.sendMail(mailOptions, async function(error, info){
          if (error) {
            await Emails.create({
              fromEmail: fromEmail,
              toEmail: toEmail,
              subject: subject,
              message: message,
              status: false,
            })
            res.status(500).json({ message: "error sending email" });
          } else {
            await Emails.create({
              fromEmail: fromEmail,
              toEmail: toEmail,
              subject: subject,
              message: message,
              status: true,
            })
            res.status(201).json({ message: "Success Sending Email", info: info.response });
          }
        });
    }
}