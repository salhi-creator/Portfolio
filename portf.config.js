module.exports = {
  apps: [
    {
      name: "backend",
      script: "./back/server.js",
      watch: true,
      
    },
    {
      name: "frontend",
      cwd: "./front",
      script: "cmd",
      args: "/c npm run dev",
      autorestart: true,

    }
  ],
};
