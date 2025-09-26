import { Redirect } from "wouter";
import ExerciseViews from "../../../../exercises/views/ExerciseViews";
import { NavigationItem } from "../../domain/entities";
import { RouterItem } from "../../domain/entities/RouterItem.entity";
import homeIcon from "../../../../assets/images/home.png";
import bagIcon from "../../../../assets/images/bag-icon.png";
import exerciseIcon from "../../../../assets/images/exercise.png";
import UnitsView from "../../../../units/views/UnitsView";

export const ROUTER_CONFIG = {
  routes: [
    new RouterItem("/", ExerciseViews),
    new NavigationItem(
      "home",
      "Inicio",
      true,
      homeIcon,
      "/home",
      ExerciseViews
    ),
    new NavigationItem(
      "units",
      "Unidades",
      false,
      exerciseIcon,
      "/units",
      UnitsView
    ),
    new NavigationItem(
      "results",
      "Resultados",
      false,
      bagIcon,
      "/results",
      ExerciseViews
    ),
    new RouterItem("*", () => <Redirect to="/" />),
  ],
};
