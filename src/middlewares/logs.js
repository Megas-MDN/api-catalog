module.exports = (req, _res, next) => {
  const dev = process.env.NODE_ENV !== "production";
  if (!dev) return next();
  const { method, url, body, query } = req;
  console.log(
    `____________________________________\n ${method} - ${url}${
      query && Object.keys(query).length
        ? `\nquery: ${JSON.stringify(query, null, 2)}`
        : ""
    }${
      body && Object.keys(body).length
        ? `\nbody:${JSON.stringify(body, null, 2)}`
        : ""
    }\n____________________________________`,
  );
  next();
};
