const fetch = require("node-fetch");

module.exports = async (req, res) => {
    const response = await fetch("http://worldtimeapi.org/api/timezone/Pacific/Auckland");
    const data = await response.json();
    res.status(200).json(data);
};
