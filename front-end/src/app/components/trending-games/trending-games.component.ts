import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription, map } from "rxjs";

import { Game } from "src/app/shared";
import * as gameActions from "../../store/game.actions";
import * as gameSelector from "../../store/game.selectors";

@Component({
	selector: "trending-games",
	templateUrl: "./trending-games.component.html",
	styleUrls: ["./trending-games.component.scss"],
})
export class TrendingGamesComponent implements OnInit, OnDestroy {
	games: Game[] = [];
	private gameStore$!: Subscription;

	constructor(
		private store: Store<{ games: Game[] }>,
		private cdRef: ChangeDetectorRef
	) {
		this.store.dispatch(gameActions.findAllGames());
	}

	ngOnInit(): void {
		this.gameStore$ = this.store
			.select(gameSelector.selectAllGames)
			.pipe(map((games) => games.filter((game) => game.tag === "trending")))
			.subscribe((games: Game[]) => {
				this.games = [...games];
				this.cdRef.detectChanges();
			});
	}

	ngOnDestroy(): void {
		this.gameStore$?.unsubscribe();
	}
}
