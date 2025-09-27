import { Redirect } from "wouter";
import ExerciseViews from "../../../../exercises/views/ExerciseViews";
import { NavigationItem } from "../../domain/entities";
import { RouterItem } from "../../domain/entities/RouterItem.entity";
import homeIcon from "../../../../assets/images/home.png";
import bagIcon from "../../../../assets/images/bag-icon.png";
import exerciseIcon from "../../../../assets/images/exercise.png";
import UnitsView from "../../../../units/views/UnitsView";
import AppLayout from "../../../../common/layouts/AppLayout/AppLayout";
import HomeView from "../../../../home/views/HomeView";
import ResultsView from "../../../../results/views/ResultsView";

export const ROUTER_CONFIG = {
  routes: [
    new RouterItem("/", () => <HomeView />),
    new NavigationItem(
      "home",
      "Inicio",
      true,
      homeIcon,
      "/home",
      // TODO: Crear vista de inicio
      () => (
        <AppLayout>
          <h1>Vista de Inicio</h1>
        </AppLayout>
      )
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
      () => (
        <AppLayout>
          <ResultsView />
        </AppLayout>
      )
    ),
    new RouterItem("/exercise/:unitId", ExerciseViews),
    new RouterItem("*", () => <Redirect to="/" />),
  ],
};
