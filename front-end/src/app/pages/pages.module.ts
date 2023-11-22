import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";

import { AppPagesRoutingModule } from "./pages-routing.module";
import { GamesComponent } from "./games/games.component";
import { TrendingGamesComponent } from "../components/trending-games/trending-games.component";
import { LayoutComponent } from "./layout/layout.component";

import { ProvidersComponent } from "../components/providers/providers.component";
import { SearchComponent } from "../components/search/search.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { GameStoreModule } from "../store/game-store.module";
import { HttpClientModule } from "@angular/common/http";

const COMPONENTS = [
	HomeComponent,
	TrendingGamesComponent,
	ProvidersComponent,
	GamesComponent,
	LayoutComponent,
	SearchComponent,
];

const MODULES = [
	CommonModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	AppPagesRoutingModule,
	GameStoreModule,
];

const MATERIAL_UI_MODULES = [
	MatFormFieldModule,
	MatSidenavModule,
	MatListModule,
	MatButtonModule,
	MatSidenavModule,
	MatInputModule,
	MatSelectModule,
	MatToolbarModule,
	MatIconModule,
	MatAutocompleteModule,
	MatIconModule,
	MatInputModule,
	MatAutocompleteModule,
	MatChipsModule,
];

@NgModule({
	imports: [...MODULES, ...MATERIAL_UI_MODULES],
	declarations: [...COMPONENTS],
	exports: [...COMPONENTS],
})
export class AppPagesModule {}
