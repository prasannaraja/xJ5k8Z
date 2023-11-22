import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { Game } from '../shared'

export const featureKey = 'games'

export const adapter = createEntityAdapter<Game>({
	selectId: (sensor: Game) => sensor.id,
	sortComparer: false,
})

export interface GamesState extends EntityState<Game> {
	selectedId: string | null
	action: string | null
	loading: boolean
	loaded: boolean
	error: any
}

export const initialstate: GamesState = adapter.getInitialState({
	selectedId: null,
	action: null,
	loading: false,
	loaded: false,
	error: null,
})
