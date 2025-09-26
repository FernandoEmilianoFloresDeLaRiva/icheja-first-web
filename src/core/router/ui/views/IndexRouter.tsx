import { Route, Router, Switch } from "wouter";
import { ROUTER_CONFIG } from "../../ui/config/router.config";

const routes = ROUTER_CONFIG.routes;

function IndexRouter() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default IndexRouter;
