// works like this: unlocks the communication between the frontend and backend, allowing them to "talk" to each other
// without CORS errors.


export function cors(req, res, next) {
  const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
      return res.sendStatus(200);
  }

  next();
}
