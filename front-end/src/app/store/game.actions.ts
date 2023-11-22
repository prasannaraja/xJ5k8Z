import { createAction, props } from '@ngrx/store'
import { Game } from '../shared'

export enum type {
	SELECT_GAME = '[ Game ] Select a Game',
	//All Games
	FIND_ALL_GAMES = '[ Game ] Find All Games',
	FIND_ALL_GAMES_FAIL = '[ Game ] Find All Games Fail',
	FIND_ALL_GAMES_SUCCESS = '[ Game ] Find All Games Success',
	//Trending Games
	TRENDING_GAMES = '[ Game ] Trending Games',
	TRENDING_GAMES_FAIL = '[ Game ] Trending Games Fail',
	TRENDING_GAMES_SUCCESS = '[ Game ] Trending Games Success',
	//Search Games
	SEARCH_GAMES = '[ Game ] Search Games',
	SEARCH_GAMES_FAIL = '[ Game ] Search Games Fail',
	SEARCH_GAMES_SUCCESS = '[ Game ] Search Games Success',
}

export const SelectGame = createAction(type.SELECT_GAME, props<{ id: string }>())
export const findAllGames = createAction(type.FIND_ALL_GAMES)
export const findAllGamesFail = createAction(type.FIND_ALL_GAMES_FAIL, props<{ error: any }>())
export const findAllGamesSuccess = createAction(type.FIND_ALL_GAMES_SUCCESS, props<{ games: Array<Game> }>())
export const trendingGames = createAction(type.TRENDING_GAMES)
export const trendingGamesFail = createAction(type.TRENDING_GAMES_FAIL, props<{ error: any }>())
export const trendingGamesSuccess = createAction(type.TRENDING_GAMES_SUCCESS, props<{ games: Game[] }>())
export const searchGames = createAction(type.SEARCH_GAMES, props<{ searchTerm: string; providers: string[] }>())
export const searchGamesFail = createAction(type.SEARCH_GAMES_FAIL, props<{ error: any }>())
export const searchGamesSuccess = createAction(type.SEARCH_GAMES_SUCCESS, props<{ games: Game[] }>())
