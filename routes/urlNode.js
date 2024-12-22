import axios from 'axios';

const testRateLimiter = async () => {
  const url = 'http://localhost:8080/api/shorten';
  const totalRequests = 1001;

  for (let i = 1; i <= totalRequests; i++) {
    try {
      const response = await axios.post(url,{
        longUrl: `https://www.pexels.com/photo/woman-in-ao-dai-in-hoi-an-s-narrow-alleyway-29327686/`,
      });
      console.log(`Request ${i}: Status ${response.status}`);
    } catch (error) {
      if (error.response) {
        console.log(`Request ${i}: Status ${error.response.status} - ${error.response.data.error}`);
      } else {
        console.error(`Request ${i}: Error`, error.message);
      }
    }
  }
};

testRateLimiter();
