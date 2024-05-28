const schema = mongoose.Schema({
  email: { type: String },
  password: { type: String },
  contact: { type: Number },
  address: { type: String },
  landmark: { type: String },
  city: { type: String },
});

const form_Data = mongoose.model("form-data", schema);

module.exports = form_Data;
