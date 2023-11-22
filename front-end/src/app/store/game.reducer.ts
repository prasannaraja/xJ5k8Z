import { Action, createReducer, on } from '@ngrx/store'
import * as gameState from './game.state'
import * as gameActions from './game.actions'

const gameReducer = createReducer(
	gameState.initialstate,
	// FIND ALL
	on(gameActions.findAllGames, (state) => ({
		...state,
		action: gameActions.type.FIND_ALL_GAMES,
		loading: true,
		error: null,
	})),
	on(gameActions.findAllGamesSuccess, (state, { games }) => {
		return gameState.adapter.addMany(games, {
			...state,
			loading: false,
		})
	}),
	on(gameActions.findAllGamesFail, (state, { error }) => ({
		...state,
		error: { ...error },
		loading: false,
	})),
	// TRENDING
	on(gameActions.trendingGames, (state) => ({
		...state,
		action: gameActions.type.TRENDING_GAMES,
		loading: true,
		error: null,
	})),
	on(gameActions.trendingGamesSuccess, (state, { games }) => {
		return gameState.adapter.addMany(games, {
			...state,
			loading: false,
		})
	}),
	on(gameActions.trendingGamesFail, (state, { error }) => ({
		...state,
		error: { ...error },
		loading: false,
	})),
	// SEARCH
	on(gameActions.searchGames, (state) => ({
		...state,
		action: gameActions.type.SEARCH_GAMES,
		loading: true,
		error: null,
	})),
	on(gameActions.searchGamesSuccess, (state, { games }) => {
		return gameState.adapter.addMany(games, {
			...state,
			loading: false,
		})
	}),
	on(gameActions.searchGamesFail, (state, { error }) => ({
		...state,
		error: { ...error },
		loading: false,
	})),
	// SELECT ONE
	on(gameActions.SelectGame, (state, { id }) => ({
		...state,
		selectedId: id,
	}))
)

export function reducer(state: gameState.GamesState, action: Action) {
	return gameReducer(state, action)
}
