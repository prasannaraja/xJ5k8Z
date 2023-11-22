import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'

import { BehaviorSubject, Observable, Subject, Subscription, debounceTime, switchMap, takeUntil, tap } from 'rxjs'
import { Game } from 'src/app/shared'
import * as gameActions from '../../store/game.actions'
import * as gameSelector from '../../store/game.selectors'
import { Dictionary } from '@ngrx/entity'

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit, OnDestroy {
	private gameStore$!: Subscription
	private destroy$ = new Subject<void>()

	games: Game[] = []

	providerList: string[]
	searchForm: UntypedFormGroup

	constructor(private fb: UntypedFormBuilder, private store: Store<{ games: any }>) {
		this.providerList = []
		this.searchForm = this.fb.group({
			searchTerm: [''],
			providers: [[]],
		})
	}

	ngOnInit(): void {
		this.gameStore$ = this.store
			.select(gameSelector.selectAllGames)
			.pipe(tap((games) => this.getProvider(games)))
			.subscribe((games) => {
				this.games = [...games]
			})

		this.searchTitle()
		this.searchProviders()
	}

	getProvider(games: Game[]): void {
		this.providerList = Array.from(new Set(games.map((game) => game.providerName)))
	}

	getControl(control: string): AbstractControl | null {
		return this.searchForm.get(control)
	}

	get title(): string {
		return this.getControl('searchTerm')?.value ?? ''
	}

	get providers(): string[] {
		return this.getControl('providers')?.value ?? []
	}

	searchTitle(): void {
		this.getControl('searchTerm')
			?.valueChanges.pipe(
				debounceTime(500),
				tap((value) => value),
				switchMap((value: string) => {
					const providerName = this.providers.join(',')
					this.store.dispatch(
						gameActions.searchGames({
							searchTerm: value,
							providers: this.providers,
						})
					)
					return this.store.select(gameSelector.selectFilteredGames, {
						providerName: providerName,
						title: value,
					})
				}),
				// takeUntil(this.destroy$),
				tap((games) => {
					this.games = games
					//console.log(this.games)
				})
			)
			.subscribe()
	}

	searchProviders(): void {
		this.getControl('providers')
			?.valueChanges.pipe(
				debounceTime(500),
				tap((value) => value),
				switchMap((value) => {
					const providerName = value.join(',')
					this.store.dispatch(
						gameActions.searchGames({
							searchTerm: this.title,
							providers: value.join(','),
						})
					)
					return this.store.select(gameSelector.selectFilteredGames, {
						providerName: providerName,
						title: value,
					})
				}),
				// takeUntil(this.destroy$),
				tap((games) => {
					this.games = games
					console.log(this.games)
				})
			)
			.subscribe()
	}

	resetProviders(): void {
		this.getControl('searchTerm')?.setValue('')
		this.getControl('providers')?.setValue([])
	}

	startGame(slug: string): void {
		const [startUrl] = this.games.filter((x) => x.slug === slug).map((x) => x.startUrl)
		window.location.href = startUrl
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
		this.gameStore$?.unsubscribe()
	}
}
