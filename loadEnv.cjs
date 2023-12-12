require('dotenv').config();
const fs = require('fs');
const path = require('path');

const createEnvFile = () => {
  const vars = [
    'REACT_APP_AWS_ACCESS_KEY_ID',
    'REACT_APP_AWS_SECRET_ACCESS_KEY',
    'REACT_APP_AWS_REGION',
    'REACT_APP_AWS_BUCKET_NAME',
    'REACT_APP_AWS_BUCKET_URL',
  ];
  const content = vars.map((key) => `${key}=${process.env[key]}`).join('\n');

  fs.writeFileSync(path.join(__dirname, 'frontend', '.env'), content);
};

createEnvFile();
