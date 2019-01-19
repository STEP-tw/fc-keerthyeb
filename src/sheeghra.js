const isMatching = (req, route) => {
  if (route.method && req.method != route.method) return false;
  if (route.url && req.url != route.url) return false;
  return true;
};

class Sheeghra {
  constructor() {
    this.routes = [];
  }

  handleRequest(req, res) {
    let matchingRoutes = this.routes.filter(r => isMatching(req, r));
    let remaining = [...matchingRoutes];

    let next = () => {
      let current = remaining[0];
      if (!current) return;
      remaining = remaining.slice(1);
      current.handler(req, res, next);
    };
    next();
  }
  use(handler) {
    this.routes.push({ handler });
  }

  get(url, handler) {
    this.routes.push({ url, handler, method: "GET" });
  }

  post(url, handler) {
    this.routes.push({ url, handler, method: "POST" });
  }
}

module.exports = Sheeghra;