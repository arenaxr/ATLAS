module.exports = async (req, res, proceed) => {
  const locals = ['::ffff:127.0.0.1', '127.0.0.1', '::1'];
  if (locals.indexOf(req.ip) > -1) {
    return proceed();
  }
  return res.forbidden();
};
