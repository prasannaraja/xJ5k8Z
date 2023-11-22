import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppPagesModule } from "./pages/pages.module";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { localStorageSync } from "ngrx-store-localstorage";
import { ActionReducer, MetaReducer } from "@ngrx/store";
import { featureKey } from "./store/game.state";

export function localStorageSyncReducer(
	reducer: ActionReducer<any>
): ActionReducer<any> {
	return localStorageSync({
		keys: [featureKey],
		rehydrate: true,
	})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
	localStorageSyncReducer,
];

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		AppPagesModule,
		EffectsModule.forRoot([]),
		StoreModule.forRoot({}, { metaReducers }),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
