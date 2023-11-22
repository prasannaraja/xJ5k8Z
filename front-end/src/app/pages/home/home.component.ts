import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable, of } from "rxjs";
import { Game } from "src/app/shared";
const NAME_KEBAB = "app-home";

@Component({
	templateUrl: "./home.component.html",
	styleUrls: ["./home.scss"],
	host: { class: NAME_KEBAB },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	gamesData$: Observable<Game[]>;

	constructor() {
		this.gamesData$ = of([]);
	}
}
