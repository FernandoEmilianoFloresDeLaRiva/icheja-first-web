import { Redirect } from "wouter";
import ExerciseViews from "../../../../exercises/views/ExerciseViews";
import { NavigationItem } from "../../domain/entities";
import { RouterItem } from "../../domain/entities/RouterItem.entity";
import settingsIcon from "../../../../assets/images/settings.png";
import bagIcon from "../../../../assets/images/bag-icon.png";
import exerciseIcon from "../../../../assets/images/exercise.png";
import homeIcon from "../../../../assets/images/home.png";
import UnitsView from "../../../../units/views/UnitsView";
import AppLayout from "../../../../common/layouts/AppLayout/AppLayout";
import HomeView from "../../../../home/views/HomeView";
import ResultsView from "../../../../results/views/ResultsView";
import SettingsPage from "../../../../settings/pages/WelcomePage";
import WelcomePage from "../../../../welcome/pages/WelcomePage";

export const ROUTER_CONFIG = {
  routes: [
    new RouterItem("/", () => <HomeView />),
    new NavigationItem(
      "welcome",
      "Inicio",
      true,
      homeIcon,
      "/welcome",
      WelcomePage
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
    new NavigationItem(
      "settings",
      "Configuración",
      false,
      settingsIcon,
      "/settings",
      () => <SettingsPage />
    ),
    new RouterItem("/exercise/:unitId", ExerciseViews),
    new RouterItem("*", () => <Redirect to="/" />),
  ],
};
