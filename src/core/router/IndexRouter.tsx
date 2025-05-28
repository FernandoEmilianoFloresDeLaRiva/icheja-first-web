import { Route, Router, Switch } from "wouter";
import ExerciseViews from "../../exercises/views/ExerciseViews";

function IndexRouter() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} component={ExerciseViews} />
        <Route path={"*"} component={ExerciseViews} />
      </Switch>
    </Router>
  );
}

export default IndexRouter;
