import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

import * as gameActions from './game.actions'
import { GameService } from '../shared/client/game.service'

@Injectable()
export class GameEffects {
	findAllGame$ = createEffect(() =>
		this.actions$.pipe(
			ofType(gameActions.findAllGames),
			switchMap(() =>
				this.gameService.findAll().pipe(
					map((games) => gameActions.findAllGamesSuccess({ games })),
					catchError((error) => of(gameActions.findAllGamesFail({ error })))
				)
			)
		)
	)

	trendingGames$ = createEffect(() =>
		this.actions$.pipe(
			ofType(gameActions.trendingGames),
			switchMap(() =>
				this.gameService.findAll().pipe(
					map((games) => gameActions.trendingGamesSuccess({ games })),
					catchError((error) => of(gameActions.trendingGamesFail({ error })))
				)
			)
		)
	)

	searchGames$ = createEffect(() =>
		this.actions$.pipe(
			ofType(gameActions.searchGames),
			switchMap((action) =>
				this.gameService.searchGames(action.searchTerm, action.providers).pipe(
					map((games) => gameActions.searchGamesSuccess({ games })),
					catchError((error) => of(gameActions.searchGamesFail({ error })))
				)
			)
		)
	)

	constructor(private actions$: Actions, private gameService: GameService) {}
}
