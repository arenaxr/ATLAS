module.exports = async (req, res, proceed) => {
  console.log(req.ip);
  if (req.ip === '127.0.0.1' || req.ip === '::1') {
    return proceed();
  }
  return res.forbidden();
};
