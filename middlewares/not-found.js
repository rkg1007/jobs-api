import NotFound from "../errors/not-found.js";

const notFound = (req, res) => {
  throw new NotFound("Page not Found");
};

export default notFound;
