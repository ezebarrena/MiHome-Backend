let instance = null
require('dotenv').config()
const jwt = require("jsonwebtoken");

const RealEstateService = require('../services/realEstate.service')
const AuthService = require('../services/auth.service')

const {v2} =  require('cloudinary');
const realEstateService = require('../services/realEstate.service');

v2.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
});

class RealEstateController {
  static getInstance() {
    if (!instance) {
      return new RealEstateController();
    }
    return instance;
  }

  async getRealEstate(req, res) {
    try {
      const realEstates = await RealEstateService.getRealEstate()
      return res.status(200).json({
        message: "Todas las inmobiliarias",
        realEstates: realEstates,
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getRealEstate",
        message: err,
      });
    }
  }

  async getReByID(req, res) {
    try {
      const reID = req.body._id;
      const realEstate = await RealEstateService.getReByID(reID)

      return res.status(200).json({
        message: "Traigo inmobiliaria",
        realEstates: realEstate,
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getRealEstate",
        message: err,
      });
    }
  }
  async createRealEstate(req, res) {
    try {
      let newRealEstate = await RealEstateService.postRealEstate(req.body)

      return res.status(201).json({
        message: "Inmobiliaria creada!",
        realEstate: newRealEstate,
        status: 201,
      })

    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "createRealEstate",
        meesage: "Inmobiliaria existente"
      })
    }
  }

  async loginAsRE(req, res) {
    try {
      const { logInEmail, password } = req.body;
      let isReRegistered = await AuthService.hasValidCredentials(logInEmail, password);
      if (isReRegistered) {

        const realEstate = await RealEstateService.getReByEmail(logInEmail);
        const id = realEstate._id
        const token = jwt.sign(realEstate.toJSON(), process.env.PRIVATE_KEY, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          status: 200,
          token,
          id,
          message: "Login successful"
        });

      } else {
        return res.status(401).json({
          message: "Unauthorized.",
          status: 401
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "login",
        message: err.message,
      });
    }
  }

  async deleteRealEstate(req, res) {
    const reId = req.body.reId;
    try {
      await RealEstateService.deleteRealEstate(reId);

      return res.status(200).json({
        message: "Real Estate deleted correclty",
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteRealEstate",
        message: "Server error",
        status: 500,
      });
    }
  }


  //chequear esto
  async sendCode(req, res) {
    const email = req.body.email;
    console.log("controlador" + email);
    try {
      await RealEstateService.sendEmailCode(email)
      return res.status(200).json({
        message: "code sent correclty",
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "sendCode",
        message: "Server error",
        status: 500,
      });
    }}
    async getReviews(req, res){
      
      const reId = req.body.reId
      try {
        const reviews = await RealEstateService.getRealEstateReviews(reId)
        console.log(reviews.reviews) 
        return res.status(200).json({
          message: "all the real estate reviews",
          reviews: reviews.reviews,
          status: 200,
        })
      } catch (err) {
        console.error(err);
        return res.status(500).json({
            method: "getReviews",
            message: "Server error",
            status: 500,
        });
      }
    }
  

  async validateCode(req, res) {
    const token = req.body.token;
    try {
      await RealEstateService.validateToken(token)
      return res.status(200).json({
        message: "token is correct",
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "validateCode",
        message: "Token incorrecto",
        status: 500,
      });
    }
  }

  async renewPassword(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      await RealEstateService.renewPassword(email, password)
      return res.status(200).json({
        message: "password renewed",
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "validateCode",
        message: "Server error",
        status: 500,
      });
    }
  }

  async getReviews(req, res) {

    const reId = req.body.reId
    try {
      const reviews = await RealEstateService.getRealEstateReviews(reId)
      return res.status(200).json({
        message: "all the real estate reviews",
        reviews: reviews,
        status: 200,
      })
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "getReviews",
        message: "Server error",
        status: 500,
      });
    }
  }

  async postReview(req, res) {
    try {
      const review = req.body.review;
      const reId = req.body.reId
      console.log(review);
      await RealEstateService.postRealEstateReview(review, reId)
      console.log("salgo del servicio");

      return res.status(200).json({
        message: "review sent",

        status: 200,
      })
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "postReview",
        message: "Server error",
        status: 500,
      });
    }
  }

  async deleteReview(req, res) {
    try {
      const reviewId = req.body.reviewId;
      const reId = req.body.reId

      await RealEstateService.deleteReviewRealEstate(reId, reviewId)

      return res.status(200).json({
        message: "review deleted",
        status: 200,
      })
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteReview",
        message: "Server error",
        status: 500,
      });
    }
  }

  async uploadProfilePic (req, res) {
    try {

      if (!req.files || !req.files.file) {
        return res.status(400).json({ msg: "No file uploaded." });
      }

      const file = req.files.file;

      await moveFileLocal(file);
      const cloudinaryResponse = await uploadToCloudinary(file);
    
      return res.status(200).json(cloudinaryResponse)

    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message || "Internal Server Error");
    }
  }

  async putRealEstate (req, res) {
    const idRealEstate = req.params.id;
    const updatedData = req.body

    try {
      const updatedRealEstate = await realEstateService.updateRealEstate(idRealEstate, updatedData)

      if (!updatedRealEstate) {
        return res.status(404).json({
          method: "putRealEstate",
          message: "RealEstate not found",
          status: 404,
        });
      }

      return res.status(200).json({
        message: "RealEstate updated correctly",
        asset: updatedRealEstate,
        status: 200,
      });

    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "putRealEstate",
        message: "Server error",
        status: 500,
      });
    }
  }
}

function moveFileLocal(file) {
  const uploadPath = `../uploads`;
  return new Promise((resolve, reject) => {
    file.mv(`${uploadPath}${file.name}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function uploadToCloudinary(file) {
  const uploadPath = `../uploads`;

  return new Promise((resolve, reject) => {
    v2.uploader.upload(`${uploadPath}${file.name}`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = RealEstateController.getInstance();