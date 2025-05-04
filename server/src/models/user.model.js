const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  // Authentication fields
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  
  // Policy related fields
  selectedPlan: { type: String, required: false },
  premium: { type: Number, required: false },
  paCover: { type: Number, required: false },
  ncbDiscountAmount: { type: Number, required: false },
  
  // Additional user details
  address: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  pincode: { type: String, required: false },
  
  // Policy details
  policies: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'policy',
    required: false 
  }],
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  versionKey: false,
  timestamps: true
});

// Pre-save hook to hash password before saving
userSchema.pre("save", function(next) {
  if (!this.isModified("password")) return next();
  
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    
    this.password = hash;
    next();
  });
});

// Method to check if password is correct
userSchema.methods.checkPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, same) => {
      if (err) return reject(err);
      
      resolve(same);
    });
  });
};

const User = mongoose.model("user", userSchema);

module.exports = User;
