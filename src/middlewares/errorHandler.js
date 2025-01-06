module.exports = (err, _req, res, _next) => {
  try {
    return res
      .status(err.status || 500)
      .send({ message: err.message || "Internal Server Error" });
  } catch (er) {
    return res.status(500).send({
      message: "Unknow Error",
      error: er.message,
      err,
      er,
    });
  }
};
