const http = require("http");

const PORT = 3000;
let serverName = "Node Training Server";

const pages = [
  { route: "/", message: "Home Page" },
  { route: "/about", message: "About Page" },
  { route: "/contact", message: "Contact Page" }
];

const getPageMessage = async (url) => {
  return new Promise((resolve, reject) => {

    const page = pages.find(p => p.route === url);

    setTimeout(() => {
      page ? resolve(page.message) : reject("Page Not Found");
    }, 300);

  });
};

const server = http.createServer(async (req, res) => {

  const { url } = req;

  try {
    const message = await getPageMessage(url);

    res.statusCode = 200;
    res.end(`${serverName} : ${message}`);

  } catch (error) {

    res.statusCode = 404;
    res.end(error);
  }

});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});