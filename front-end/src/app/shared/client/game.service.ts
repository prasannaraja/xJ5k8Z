import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Game } from "..";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class GameService {
	constructor(private http: HttpClient) {}

	getGames(): Observable<Game[]> {
		const dataURL = "assets/game.mock-data.json";
		return this.http.get<Game[]>(dataURL);
	}

	findAll(): Observable<Array<Game>> {
		return this.http.get<Array<Game>>(`${environment.api}/games`);
	}

	findById(id: string): Observable<Game> {
		return this.http.get<Game>(`${environment.api}/games/${id}`);
	}

	delete(id: string): Observable<any> {
		return this.http.delete(`${environment.api}/games/${id}`);
	}

	searchGames(searchTerm: string, providers: string[]): Observable<Game[]> {
		const dataURL = `${environment.api}/games?searchTerm=${searchTerm}&providers=${providers}`;
		return this.http.get<Game[]>(dataURL);
	}
}
