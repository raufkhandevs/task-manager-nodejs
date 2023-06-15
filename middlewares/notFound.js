const notFound = (req, res) => res.status(404).send('Path do not exists');

module.exports = notFound;
