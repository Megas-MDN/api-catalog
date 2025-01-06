module.exports = (req, res) => {
  const { body } = req.body;
  const { authorization } = req.headers;
  return res.status(501).send({
    message: "Route not implemented",
    url: req.url,
    method: req.method,
    body,
    authorization,
  });
};
