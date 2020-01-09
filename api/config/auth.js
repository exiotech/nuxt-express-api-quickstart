import passport from 'passport';
import { createLocalStrategy } from 'lib/security';
import { STRATEGY_MODEL, STRATEGIES } from 'const/auth';

STRATEGIES.forEach(strategy => {
  passport.use(
    strategy,
    createLocalStrategy(STRATEGY_MODEL[strategy], strategy)
  );
});

export default function(app) {
  app.use(passport.initialize());
  return app;
}
