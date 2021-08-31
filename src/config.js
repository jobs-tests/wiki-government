import dotenv from 'dotenv';

dotenv.config();
const config = {
	REACT_APP_API_BASE_URL:
		process.env.REACT_APP_API_BASE_URL ||
		'https://en.wikipedia.org/w/api.php',
};

export default config;
