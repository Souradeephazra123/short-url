//based on ip address

// const rateLimitMap = new Map();

// const customRateLimiter = (req, res, next) => {
//   const ip = req.ip;
//   const currentTime = Date.now();
//   const oneHour = 60 * 1000;
//   const maxRequests = 1000;

//   if (!rateLimitMap.has(ip)) {
//     rateLimitMap.set(ip, { count: 1, startTime: currentTime });
//     return next();
//   }

//   const reqestInfo = rateLimitMap.get(ip);

//   const timePassed = currentTime - reqestInfo.startTime;
//   if (timePassed < oneHour) {
//     if (reqestInfo.count < maxRequests) {
//       reqestInfo.count++;
//       rateLimitMap.set(ip, reqestInfo);
//       return next();
//     } else {
//       return res
//         .status(429)
//         .json({ message: "Too many requests, please try again later." });
//     }
//   } else {
//     rateLimitMap.set(ip, { count: 1, startTime: currentTime });
//     return next();
//   }
// };

//based on total number of requests

let requestCount = 0;
let startTime = Date.now();
const customRateLimiter = (req, res, next) => {
  const currentTime = Date.now();
  const oneMinute = 60 * 1000;
  const maxRequests = 100;
  if (currentTime - startTime < oneMinute) {
    if (requestCount < maxRequests) {
      requestCount++;
      return next();
    } else {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
  } else {
    startTime = currentTime;
    requestCount++;
    return next();
  }
};

export default customRateLimiter;
