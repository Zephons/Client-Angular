export const environment = {
  production: true,
  spring_port: process.env.SPRING_PORT || 'http://localhost:8080',
  express_port: process.env.EXPRESS_PORT || 'http://localhost:3000'
};
