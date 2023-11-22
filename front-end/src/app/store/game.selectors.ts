import { createFeatureSelector, createSelector } from '@ngrx/store'
import { GamesState, featureKey, adapter } from './game.state'
import * as gameActions from './game.actions'
import { Game } from '../shared/client/game.model'

const { selectEntities, selectAll } = adapter.getSelectors()

const getGameState = createFeatureSelector<GamesState>(featureKey)
const selectGameEntities = createSelector(getGameState, selectEntities)
const selectGameSensorId = createSelector(getGameState, (state: GamesState) => state.selectedId)

export const selectAllGames = createSelector(getGameState, selectAll)
export const selectCurrentGame = createSelector(
	selectGameEntities,
	selectGameSensorId,
	(userEntities, userId) => userId && userEntities[userId]
)

export const selectFilteredGames = createSelector(
	selectAllGames,
	(games: Game[], props: { providerName: string; title: string }) => {
		const providers = props.providerName.split(',')
		return games.filter(
			(game: Game) => {
				return providers.some((provider) => game.providerName.includes(provider.toLowerCase()))
			}
			//&& game.title.toLowerCase().includes(props.title.toLowerCase())
		)
	}
)
