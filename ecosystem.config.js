module.exports = {
  apps: [{
    name: 'BitAlert',
    script: './server/index.js',
    cwd: '/home/cryptoalerts/app/current',
    interpreter: 'babel-node',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'cryptoalerts',
      host: '165.22.185.216',
      ref: 'origin/master',
      repo: 'git@gitlab.com:andhovesyan/bitalert.git',
      path: '/home/cryptoalerts/app',
      'post-deploy':
        'rm -rf node_modules && npm ci && cp .env.production .env && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
