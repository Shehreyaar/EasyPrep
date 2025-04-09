// works like this: unlocks the communication between the frontend and backend, allowing them to "talk" to each other
// without CORS errors.


export function cors(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }
    

    next();
  }
  