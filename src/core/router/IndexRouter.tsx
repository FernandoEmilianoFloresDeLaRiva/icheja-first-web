import { Route, Router, Switch } from "wouter";
import ExerciseViews from "../../exercises/views/ExerciseViews";
import SplashView from "../../splash/views/SplashView";

function IndexRouter() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} component={SplashView} />
        <Route path={"/exercises"} component={ExerciseViews} />
        <Route path={"*"} component={ExerciseViews} />
      </Switch>
    </Router>
  );
}

export default IndexRouter;
